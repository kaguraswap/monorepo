import { Item, OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { ethers } from "ethers";
import httpError from "http-errors";
import { ajv } from "lib/ajv";
import type { NextApiRequest, NextApiResponse } from "next";

import { KaguraSDK } from "../../../../../hardhat/lib";
import { SignedOrder } from "../../../../../hardhat/types/order";
import { OrderAttributes } from "../../../../../hasura/dist/entity/init-models";
import { OrderDirection_Enum, OrderProtocol_Enum } from "../../../../../hasura/dist/graphql";
import { models } from "../../../../../hasura/src/sequelize";
import networks from "../../../../../shared/src/configs/networks.json";
import { ChainId } from "../../../../../shared/src/types/network";
import { error } from "../../../../../shared/src/utils/error";

export interface OrderCreateProps extends Pick<OrderAttributes, "contractAddress" | "tokenId"> {
  direction: OrderDirection_Enum;
  protocol: OrderProtocol_Enum;
  chainId: ChainId;
  signedOrder: SignedOrder;
}

const orderCreatePropsSchema = {
  type: "object",
  properties: {
    protocol: { type: "string", format: "protocol" },
    direction: { type: "string", format: "direction" },
    chainId: { type: "string", format: "chainId" },
    contractAddress: { type: "string", format: "address" },
    tokenId: { type: "string", format: "tokenId" },
    signedOrder: { type: "object" },
  },
  required: ["protocol", "direction", "chainId", "contractAddress", "tokenId", "signedOrder"],
  additionalProperties: false,
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const validate = ajv.compile<OrderCreateProps>(orderCreatePropsSchema);
  if (!validate(req.body)) {
    throw httpError(error.invalidArgument.code, error.invalidArgument.message);
  }
  const { protocol, direction, chainId, contractAddress, tokenId, signedOrder } = req.body;

  // TODO: implement and remove
  if (protocol !== OrderProtocol_Enum.Seaport) {
    throw httpError(error.notImplemented.code, error.notImplemented.message);
  }

  const { rpc } = networks[chainId];
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const sdk = new KaguraSDK(provider);
  const isValid = await sdk.order.validate(protocol, signedOrder);
  if (!isValid) {
    throw httpError(error.orderIsInvalid.code, error.orderIsInvalid.message);
  }
  const hash = await sdk.order.hash(protocol, signedOrder);

  // TODO: update to event trigger?
  // TODO: consider case which order does not have consideration in first element?

  const { parameters } = signedOrder as OrderWithCounter;
  const items = direction === OrderDirection_Enum.Sell ? parameters.consideration : parameters.offer;
  const price = items
    .reduce((a: ethers.BigNumber, b: Item) => {
      return a.add(b.startAmount);
    }, ethers.BigNumber.from(0))
    .toString();
  const sortablePrice = Number(price);
  const offerer = parameters.offerer;

  const [order] = await models.Order.upsert({
    id: hash,
    protocol,
    chainId: chainId.toString(),
    contractAddress,
    tokenId,
    isValid,
    signedOrder,
    offerer,
    sortablePrice,
    price,
    direction,
  });
  res.status(200).json({ order });
};

export default handler;
