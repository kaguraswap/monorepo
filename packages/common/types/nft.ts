import { ethers } from "ethers";

import { isChainId } from "./chainId";
import { Collection } from "./collection";
import { Order } from "./order";

export interface SupportsInterface {
  isERC165?: boolean;
  isERC721?: boolean;
  isERC721Metadata?: boolean;
}

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
  tokenURI?: string;
  supportsInterface?: SupportsInterface;
  metadata?: NFTMetadata;
  collection?: Collection;
  orders?: Order[];
}
