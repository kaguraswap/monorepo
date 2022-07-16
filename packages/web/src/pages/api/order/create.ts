import { ethers } from "ethers";
import { orm } from "lib/sequelize";
import type { NextApiRequest, NextApiResponse } from "next";

import networks from "../../../../../common/configs/networks.json";
import { isChainId } from "../../../../../common/entities/network";
import { INVALID_ARGUMENT, ORDER_VERIFICATION_FAILED } from "../../../../../common/utils/error";
import { KaguraSDK } from "../../../../../sdk/lib";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { type, nft, signedOrder } = req.body;

  console.log(type, nft, signedOrder);
  const { chainId } = nft;
  if (!isChainId(chainId)) {
    throw new Error(INVALID_ARGUMENT);
  }
  const { rpc } = networks[chainId];
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const sdk = new KaguraSDK(provider);
  const isValid = await sdk.order.validate(type, signedOrder);
  if (!isValid) {
    throw new Error(ORDER_VERIFICATION_FAILED);
  }
  const hash = await sdk.order.hash(type, signedOrder);
  const order = {
    id: hash,
    type,
    chainId: chainId.toString(),
    contractAddress: nft.contractAddress,
    tokenId: nft.tokenId,
    isValid,
    signedOrder,
  };
  await orm.order.upsert(order);
  res.status(200).json({ order });
};

export default handler;
