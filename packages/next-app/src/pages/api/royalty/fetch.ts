import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

import IERC2981Artifact from "../../../../../hardhat/dist/artifacts/@openzeppelin/contracts/interfaces/IERC2981.sol/IERC2981.json";
import { IERC2981 } from "../../../../../hardhat/dist/types";
import { ADDRESS_NULL } from "../../../../../shared/src/configs/app";
import networks from "../../../../../shared/src/configs/networks.json";
import { ChainId } from "../../../../../shared/src/types/network";

export interface FetchRoyaltyParams {
  chainId: ChainId;
  contractAddress: string;
  tokenId: string;
  price: number;
}

export const fetchRoyalty = async ({ chainId, contractAddress, tokenId, price }: FetchRoyaltyParams) => {
  const { rpc } = networks[chainId];
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const erc2981 = <IERC2981>new ethers.Contract(contractAddress, IERC2981Artifact.abi, provider);
  const { receiver, royaltyAmount } = await erc2981.royaltyInfo(tokenId, price).catch(() => {
    return { receiver: ADDRESS_NULL, royaltyAmount: "0" };
  });
  return { receiver, royaltyAmount };
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { receiver, royaltyAmount } = await fetchRoyalty(req.body);
  res.status(200).json({ receiver, royaltyAmount });
};

export default handler;
