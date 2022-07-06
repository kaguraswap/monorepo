import networks from "../../../../common/configs/networks.json";
import { ChainId } from "../../../../common/types/chainId";
import { NFT } from "../../../../common/types/nft";
import { covelant } from "./covalent";

export const validateChainId = (chainId: ChainId) => {
  const { api } = networks[chainId];
  if (api !== "covalent") {
    throw new Error("not implemented");
  }
};

export const getNFT = (chainId: ChainId, contractAddress: string, tokenId: string) => {
  validateChainId(chainId);
  return covelant.getNFT(chainId, contractAddress, tokenId);
};

export const getNFTsByWalletAddress = async (chainId: ChainId, walletAddress: string): Promise<NFT[]> => {
  validateChainId(chainId);
  return covelant.getNFTsByWalletAddress(chainId, walletAddress);
};
