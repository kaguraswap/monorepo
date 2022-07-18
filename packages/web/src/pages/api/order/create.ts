import { Item } from "@opensea/seaport-js/lib/types";
import { ethers } from "ethers";
import { orm } from "lib/sequelize";
import type { NextApiRequest, NextApiResponse } from "next";

import networks from "../../../../../common/configs/networks.json";
import { isChainId } from "../../../../../common/entities/network";
import { INVALID_ARGUMENT, NOT_IMPLEMENTED, ORDER_VERIFICATION_FAILED } from "../../../../../common/utils/error";
import { KaguraSDK } from "../../../../../sdk/lib";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { protocol, direction, nft, signedOrder } = req.body;
  // TODO: better common validation
  const { chainId } = nft;
  if (!isChainId(chainId)) {
    throw new Error(INVALID_ARGUMENT);
  }
  const { rpc } = networks[chainId];
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const sdk = new KaguraSDK(provider);
  const isValid = await sdk.order.validate(protocol, signedOrder);
  if (!isValid) {
    throw new Error(ORDER_VERIFICATION_FAILED);
  }
  const hash = await sdk.order.hash(protocol, signedOrder);

  // TODO: update to event trigger?
  // TODO: consider case which order does not have consideration in first element?
  let offerer;
  let price;
  let sortablePrice;

  if (protocol === "seaport") {
    const items = direction === "sell" ? signedOrder.parameters.consideration : signedOrder.parameters.offer;
    price = items
      .reduce((a: number | ethers.BigNumber, b: Item) => {
        return ethers.BigNumber.from(a).add(b.startAmount);
      }, 0)
      .toString();
    sortablePrice = price;
    offerer = signedOrder.parameters.offerer;
  } else {
    throw new Error(NOT_IMPLEMENTED);
  }

  const order = {
    id: hash,
    protocol,
    chainId: chainId.toString(),
    contractAddress: nft.contractAddress,
    tokenId: nft.tokenId,
    isValid,
    signedOrder,
    offerer,
    sortablePrice,
    price,
    direction,
  };

  await orm.order.upsert(order);
  res.status(200).json(order);
};

export default handler;
