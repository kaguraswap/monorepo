import { NFT } from "./nft";

export interface Order {
  type: "sell" | "buy";
  chainId: string;
  contractAddress: string;
  tokenId: string;
  currencyContractAddress: string;
  value: string;
  hash: string;
  signature: string;
  nft?: NFT;
}
