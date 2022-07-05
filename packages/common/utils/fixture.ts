import { Collection } from "../types/collection";
import { NFT } from "../types/nft";
import { Order } from "../types/order";
import { ADDRESS_1, BYTES32_1, SIGNATURE_1 } from "./constant";
import { filterAndMergeNFTsWithCollection, filterAndMergeOrdersWithNFT } from "./filter";

export const _collections: Collection[] = [
  {
    chainId: "1",
    contractAddress: ADDRESS_1,
    name: "collection name",
    description: "collection description",
    logo: "https://via.placeholder.com/350x350",
    banner: "https://via.placeholder.com/350x150",
  },
  {
    chainId: "42",
    contractAddress: ADDRESS_1,
    name: "collection name",
    description: "collection description",
    logo: "https://via.placeholder.com/350x350",
    banner: "https://via.placeholder.com/350x150",
  },
];
export const _nfts: NFT[] = [
  {
    chainId: "1",
    contractAddress: ADDRESS_1,
    tokenId: "0",
    metadata: {
      name: "nft name",
      description: "nft description",
      image: "https://via.placeholder.com/350x350",
    },
  },
  {
    chainId: "1",
    contractAddress: ADDRESS_1,
    tokenId: "1",
    metadata: {
      name: "nft name",
      description: "nft description",
      image: "https://via.placeholder.com/350x350",
    },
  },
  {
    chainId: "42",
    contractAddress: ADDRESS_1,
    tokenId: "0",
    metadata: {
      name: "nft name",
      description: "nft description",
      image: "https://via.placeholder.com/350x350",
    },
  },
  {
    chainId: "42",
    contractAddress: ADDRESS_1,
    tokenId: "1",
    metadata: {
      name: "nft name",
      description: "nft description",
      image: "https://via.placeholder.com/350x350",
    },
  },
];
export const _orders: Order[] = [
  {
    type: "buy",
    chainId: "1",
    contractAddress: ADDRESS_1,
    tokenId: "0",
    currencyContractAddress: ADDRESS_1,
    value: "0",
    hash: BYTES32_1,
    signature: SIGNATURE_1,
  },
  {
    type: "sell",
    chainId: "1",
    contractAddress: ADDRESS_1,
    tokenId: "1",
    currencyContractAddress: ADDRESS_1,
    value: "0",
    hash: BYTES32_1,
    signature: SIGNATURE_1,
  },
  {
    type: "buy",
    chainId: "42",
    contractAddress: ADDRESS_1,
    tokenId: "0",
    currencyContractAddress: ADDRESS_1,
    value: "0",
    hash: BYTES32_1,
    signature: SIGNATURE_1,
  },
  {
    type: "sell",
    chainId: "42",
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
    nfts: filterAndMergeNFTsWithCollection(_nfts, collection).map((nft) => {
      return {
        ...nft,
        orders: filterAndMergeOrdersWithNFT(_orders, nft),
      };
    }),
  };
});
export const [collection] = collections;
export const nfts = collection.nfts;
export const [nft] = nfts;
export const orders = nft.orders;
export const [order] = orders;
