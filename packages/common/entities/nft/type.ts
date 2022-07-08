import { ChainId } from "../network";

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
  chainId: ChainId;
  contractAddress: string;
  tokenId: string;
  holder?: string;
  tokenURI?: string;
  supportsInterface?: SupportsInterface;
  metadata?: NFTMetadata;
}
