import { ethers } from "ethers";

import { isChainId } from "../types/chainId";
import { NFT } from "../types/nft";

export const toKey = (nft: NFT) => {
  return `${nft.chainId}:${nft.contractAddress}:${nft.tokenId}`;
};

export const fromKey = (key: string) => {
  const [chainId, contractAddress, tokenId] = key.split(":");
  return { chainId, contractAddress, tokenId };
};

export const validate = (params?: Partial<NFT>) => {
  if (
    !params ||
    typeof params.chainId !== "string" ||
    typeof params.contractAddress !== "string" ||
    typeof params.tokenId !== "string" ||
    !isChainId(params.chainId) ||
    !ethers.utils.isAddress(params.contractAddress)
  ) {
    return;
  }
  return { chainId: params.chainId, contractAddress: params.contractAddress, tokenId: params.tokenId };
};
