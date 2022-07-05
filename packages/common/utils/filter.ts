import { Collection } from "../types/collection";
import { NFT } from "../types/nft";
import { Order } from "../types/order";

export const filterAndMergeNFTsWithCollection = (nfts: NFT[], collection: Collection) => {
  return nfts
    .filter((nft) => {
      return nft.chainId === collection.chainId && nft.contractAddress === collection.contractAddress;
    })
    .map((nft) => {
      return {
        ...nft,
        collection,
      };
    });
};

export const filterAndMergeOrdersWithNFT = (orders: Order[], nft: NFT) => {
  return orders
    .filter((order) => {
      return (
        order.chainId === nft.chainId && order.contractAddress === nft.contractAddress && order.tokenId === nft.tokenId
      );
    })
    .map((order) => {
      return {
        ...order,
        nft,
      };
    });
};
