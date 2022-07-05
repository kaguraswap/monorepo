import { Asset } from "../types/asset";
import { Collection } from "../types/collection";
import { Order } from "../types/order";
import { ADDRESS_1, BYTES32_1, SIGNATURE_1 } from "./constant";
import { filterAndMergeAssetsWithCollection, filterAndMergeOrdersWithAsset } from "./filter";

export const _collections: Collection[] = [
  {
    chainId: 3,
    contractAddress: ADDRESS_1,
    name: "collection name",
    description: "collection description",
    logo: "https://via.placeholder.com/350x350",
    banner: "https://via.placeholder.com/350x150",
  },
  {
    chainId: 4,
    contractAddress: ADDRESS_1,
    name: "collection name",
    description: "collection description",
    logo: "https://via.placeholder.com/350x350",
    banner: "https://via.placeholder.com/350x150",
  },
];
export const _assets: Asset[] = [
  {
    chainId: 3,
    contractAddress: ADDRESS_1,
    tokenId: "0",
    name: "asset name",
    description:
      "With a sleek design and a captivating essence, this is a modern Classic made for every occasion.asset description",
    image: "https://via.placeholder.com/350",
  },
  {
    chainId: 3,
    contractAddress: ADDRESS_1,
    tokenId: "1",
    name: "asset name",
    description:
      "With a sleek design and a captivating essence, this is a modern Classic made for every occasion.asset description",
    image: "https://via.placeholder.com/350",
  },
  {
    chainId: 4,
    contractAddress: ADDRESS_1,
    tokenId: "0",
    name: "asset name",
    description: "asset description",
    image: "https://via.placeholder.com/350",
  },
  {
    chainId: 4,
    contractAddress: ADDRESS_1,
    tokenId: "1",
    name: "asset name",
    description: "asset description",
    image: "https://via.placeholder.com/350",
  },
];
export const _orders: Order[] = [
  {
    type: "buy",
    chainId: 3,
    contractAddress: ADDRESS_1,
    tokenId: "0",
    currencyContractAddress: ADDRESS_1,
    value: "0",
    hash: BYTES32_1,
    signature: SIGNATURE_1,
  },
  {
    type: "sell",
    chainId: 3,
    contractAddress: ADDRESS_1,
    tokenId: "1",
    currencyContractAddress: ADDRESS_1,
    value: "0",
    hash: BYTES32_1,
    signature: SIGNATURE_1,
  },
  {
    type: "buy",
    chainId: 4,
    contractAddress: ADDRESS_1,
    tokenId: "0",
    currencyContractAddress: ADDRESS_1,
    value: "0",
    hash: BYTES32_1,
    signature: SIGNATURE_1,
  },
  {
    type: "sell",
    chainId: 4,
    contractAddress: ADDRESS_1,
    tokenId: "1",
    currencyContractAddress: ADDRESS_1,
    value: "0",
    hash: BYTES32_1,
    signature: SIGNATURE_1,
  },
];
export const collections = _collections.map((collection) => {
  return {
    ...collection,
    assets: filterAndMergeAssetsWithCollection(_assets, collection).map((asset) => {
      return {
        ...asset,
        orders: filterAndMergeOrdersWithAsset(_orders, asset),
      };
    }),
  };
});
export const [collection] = collections;
export const assets = collection.assets;
export const [asset] = assets;
export const orders = asset.orders;
export const [order] = orders;
