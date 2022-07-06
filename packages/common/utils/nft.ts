import { NFT } from "../types/nft";

export const toKey = (nft: NFT) => {
  return `${nft.chainId}:${nft.contractAddress}:${nft.tokenId}`;
};

export const fromKey = (key: string) => {
  const [chainId, contractAddress, tokenId] = key.split(":");
  return { chainId, contractAddress, tokenId };
};
