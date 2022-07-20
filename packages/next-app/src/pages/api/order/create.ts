import { Item, OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { ethers } from "ethers";
import { ajv, assetSchema } from "lib/ajv";
import { models } from "lib/sequelize";
import type { NextApiRequest, NextApiResponse } from "next";

import networks from "../../../../../common/configs/networks.json";
import { OrderAttributes } from "../../../../../common/dist/entity/init-models";
import { ChainId } from "../../../../../common/types/network";
import { OrderDirection, OrderType, SignedOrder } from "../../../../../common/types/order";
import { INVALID_ARGUMENT, NOT_IMPLEMENTED } from "../../../../../common/utils/error";
import { KaguraSDK } from "../../../../../hardhat/lib";

export interface OrderCreateProps extends Pick<OrderAttributes, "contractAddress" | "tokenId"> {
  direction: OrderDirection;
  protocol: OrderType;
  chainId: ChainId;
  signedOrder: SignedOrder;
}

const orderCreatePropsSchema = {
  type: "object",
  properties: {
    protocol: { type: "string" },
    direction: { type: "string" },
    ...assetSchema.properties,
    signedOrder: { type: "object" },
  },
  required: ["protocol", "direction", "signedOrder"].concat(assetSchema.required),
  additionalProperties: false,
};

// TODO: error handling

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const validate = ajv.compile<OrderCreateProps>(orderCreatePropsSchema);
  if (!validate(req.body)) {
    throw new Error(INVALID_ARGUMENT);
  }
  const { protocol, direction, chainId, contractAddress, tokenId, signedOrder } = req.body;
  const { rpc } = networks[chainId];
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const sdk = new KaguraSDK(provider);
  const isValid = await sdk.order.validate(protocol, signedOrder);
  if (!isValid) {
    throw new Error(INVALID_ARGUMENT);
  }
  const hash = await sdk.order.hash(protocol, signedOrder);

  // TODO: update to event trigger?
  // TODO: consider case which order does not have consideration in first element?
  let offerer;
  let price;
  let sortablePrice;

  if (protocol === "seaport") {
    const { parameters } = signedOrder as OrderWithCounter;
    const items = direction === "sell" ? parameters.consideration : parameters.offer;
    // TODO: better type
    price = items
      .reduce((a: ethers.BigNumber, b: Item) => {
        return a.add(b.startAmount);
      }, ethers.BigNumber.from(0))
      .toString();
    sortablePrice = price as unknown as number;
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
