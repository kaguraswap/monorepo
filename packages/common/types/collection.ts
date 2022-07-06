import { NFT } from "./nft";

export interface Collection {
  chainId: string;
  contractAddress: string;
  name?: string;
  description?: string;
  banner?: string;
  logo?: string;
  nfts?: NFT[];
}
