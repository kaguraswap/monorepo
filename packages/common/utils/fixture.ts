import { Collection } from "../types/collection";
import { NFT } from "../types/nft";
import { Order } from "../types/order";
import { ADDRESS_1, UINT256_MAX, UINT256_MIN } from "./constant";
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
    holder: ADDRESS_1,
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
    holder: ADDRESS_1,
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
    holder: ADDRESS_1,
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
    holder: ADDRESS_1,
    metadata: {
      name: "nft name",
      description: "nft description",
      image: "https://via.placeholder.com/350x350",
    },
  },
];

const _order1 = {
  direction: "buy" as const,
  type: "seaport" as const,
  chainId: "1",
  nftContractAddress: ADDRESS_1,
  nftTokenId: "0",
  currencyContractAddress: ADDRESS_1,
  value: "0",
  taker: ADDRESS_1,
  maker: ADDRESS_1,
  startTime: UINT256_MIN,
  endTime: UINT256_MAX,
  raw: "",
};
const _order2 = {
  direction: "sell" as const,
  type: "seaport" as const,
  chainId: "1",
  nftContractAddress: ADDRESS_1,
  nftTokenId: "0",
  currencyContractAddress: ADDRESS_1,
  value: "0",
  taker: ADDRESS_1,
  maker: ADDRESS_1,
  startTime: UINT256_MIN,
  endTime: UINT256_MAX,
  raw: "",
};
const _order3 = {
  direction: "buy" as const,
  type: "seaport" as const,
  chainId: "42",
  nftContractAddress: ADDRESS_1,
  nftTokenId: "0",
  currencyContractAddress: ADDRESS_1,
  value: "0",
  taker: ADDRESS_1,
  maker: ADDRESS_1,
  startTime: UINT256_MIN,
  endTime: UINT256_MAX,
  raw: "",
};
const _order4 = {
  direction: "sell" as const,
  type: "seaport" as const,
  chainId: "42",
  nftContractAddress: ADDRESS_1,
  nftTokenId: "0",
  currencyContractAddress: ADDRESS_1,
  value: "0",
  taker: ADDRESS_1,
  maker: ADDRESS_1,
  startTime: UINT256_MIN,
  endTime: UINT256_MAX,
  raw: "",
};

export const _orders: Order[] = [
  {
    ..._order1,
    raw: {
      ..._order1,
    },
  },
  {
    ..._order2,
    raw: {
      ..._order2,
    },
  },
  {
    ..._order3,
    raw: {
      ..._order3,
    },
  },
  {
    ..._order4,
    raw: {
      ..._order4,
    },
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
