import { NFT } from "../entities/nft";
import { Order } from "../entities/order";

export const filterAndMergeOrdersWithNFT = (orders: Order[], nft: NFT) => {
  return orders
    .filter((order) => {
      return (
        order.chainId === nft.chainId &&
        order.nftContractAddress === nft.contractAddress &&
        order.nftTokenId === nft.tokenId
      );
    })
    .map((order) => {
      return {
        ...order,
        nft,
      };
    });
};
