import { Item } from "@opensea/seaport-js/lib/types";
import { ethers } from "ethers";
import { ajv } from "lib/ajv";
import { models } from "lib/sequelize";
import type { NextApiRequest, NextApiResponse } from "next";

import networks from "../../../../../common/configs/networks.json";
import { OrderAttributes } from "../../../../../common/dist/entity/init-models";
import { ChainId } from "../../../../../common/types/network";
import { OrderType, SignedOrder } from "../../../../../common/types/order";
import { INVALID_ARGUMENT, NOT_IMPLEMENTED, ORDER_VERIFICATION_FAILED } from "../../../../../common/utils/error";
import { KaguraSDK } from "../../../../../hardhat/lib";

export type OrderCreateProps = Pick<
  OrderAttributes,
  "protocol" | "direction" | "chainId" | "contractAddress" | "tokenId" | "signedOrder"
>;

const orderCreatePropsSchema = {
  type: "object",
  properties: {
    protocol: { type: "string" },
    direction: { type: "string" },
    chainId: { type: "string" },
    contractAddress: { type: "string" },
    tokenId: { type: "string" },
    signedOrder: { type: "object" },
  },
  required: ["protocol", "direction", "chainId", "contractAddress", "tokenId", "signedOrder"],
  additionalProperties: false,
};

// TODO: error
// TODO: typeguard with ajv
// TODO: chainId

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const validate = ajv.compile<OrderCreateProps>(orderCreatePropsSchema);
  if (!validate(req.body)) {
    throw new Error(INVALID_ARGUMENT);
  }
  const { protocol, direction, chainId, contractAddress, tokenId, signedOrder } = req.body;
  const { rpc } = networks[chainId as ChainId];
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const sdk = new KaguraSDK(provider);
  const isValid = await sdk.order.validate(protocol as OrderType, signedOrder as SignedOrder);
  if (!isValid) {
    throw new Error(ORDER_VERIFICATION_FAILED);
  }
  const hash = await sdk.order.hash(protocol as OrderType, signedOrder as SignedOrder);

  // TODO: update to event trigger?
  // TODO: consider case which order does not have consideration in first element?
  let offerer;
  let price;
  let sortablePrice;

  if (protocol === "seaport") {
    const { parameters } = signedOrder as any;
    const items = direction === "sell" ? parameters.consideration : parameters.offer;
    price = items
      .reduce((a: number | ethers.BigNumber, b: Item) => {
        return ethers.BigNumber.from(a).add(b.startAmount);
      }, 0)
      .toString();
    sortablePrice = price;
    offerer = parameters.offerer;
  } else {
    throw new Error(NOT_IMPLEMENTED);
  }
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
