import { Asset } from "./asset";

export interface Order {
  type: "sell" | "buy";
  chainId: number;
  contractAddress: string;
  tokenId: string;
  currencyContractAddress: string;
  value: string;
  hash: string;
  signature: string;
  asset?: Asset;
}
