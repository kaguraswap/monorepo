import { Asset } from "../types/asset";
import { Collection } from "../types/collection";
import { Order } from "../types/order";

export const filterAndMergeAssetsWithCollection = (assets: Asset[], collection: Collection) => {
  return assets
    .filter((asset) => {
      return asset.chainId === collection.chainId && asset.contractAddress === collection.contractAddress;
    })
    .map((asset) => {
      return {
        ...asset,
        collection,
      };
    });
};

export const filterAndMergeOrdersWithAsset = (orders: Order[], asset: Asset) => {
  return orders
    .filter((order) => {
      return (
        order.chainId === asset.chainId &&
        order.contractAddress === asset.contractAddress &&
        order.tokenId === asset.tokenId
      );
    })
    .map((order) => {
      return {
        ...order,
        asset,
      };
    });
};
