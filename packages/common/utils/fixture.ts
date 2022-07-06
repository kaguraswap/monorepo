import { NFT } from "../types/nft";
import { Order } from "../types/order";
import { ADDRESS_1, UINT256_MAX, UINT256_MIN } from "./constant";

export const nfts: NFT[] = [
  {
    chainId: "1",
    contractAddress: ADDRESS_1,
    tokenId: "0",
    holder: ADDRESS_1,
    metadata: {
      name: "nft name",
      description:
        "With a sleek design and a captivating essence, this is a modern Classic made for every occasion.asset description",
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
      description:
        "With a sleek design and a captivating essence, this is a modern Classic made for every occasion.asset description",
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

export const orders: Order[] = [
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

export const [nft] = nfts;
export const [order] = orders;
