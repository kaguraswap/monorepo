import { Item, OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { ethers } from "ethers";
import httpError from "http-errors";
import { validate } from "lib/ajv";
import type { NextApiRequest, NextApiResponse } from "next";

import { KaguraSDK } from "../../../../../hardhat/lib";
import { SignedOrder } from "../../../../../hardhat/types/order";
import { OrderDirection_Enum, OrderProtocol_Enum } from "../../../../../hasura/dist/graphql";
import { models } from "../../../../../hasura/src/lib/sequelize";
import networks from "../../../../../shared/src/configs/networks.json";
import { AssetKey } from "../../../../../shared/src/types/asset";
import { error } from "../../../../../shared/src/utils/error";

export interface CreateOrderParams extends AssetKey {
  direction: OrderDirection_Enum;
  protocol: OrderProtocol_Enum;
  signedOrder: SignedOrder;
}

export const createOrder = async (params: CreateOrderParams) => {
  if (!validate.createOrderParams(params)) {
    throw httpError(error.invalidArgument.code, error.invalidArgument.message);
  }
  const { protocol, direction, chainId, contractAddress, tokenId, signedOrder } = params;

  // TODO: #16
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
  return { order };
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { order } = await createOrder(req.body);
  res.status(200).json({ order });
};

export default handler;
