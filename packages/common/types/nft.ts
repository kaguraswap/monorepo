import { Collection } from "./collection";
import { Order } from "./order";

export interface NFTMetadata {
  name?: string;
  description?: string;
  image?: string;
  animationUrl?: string;
}

export interface NFT {
  chainId: string;
  contractAddress: string;
  tokenId: string;
  holder?: string;
  metadata?: NFTMetadata;
  collection?: Collection;
  orders?: Order[];
}
