import { ADDRESS_1, UINT256_MAX, UINT256_MIN } from "../../utils/constant";
import { asset } from "../asset";
import { Order } from "./type";

export const orders: Order[] = [
  {
    direction: "buy" as const,
    type: "seaport" as const,
    chainId: "1",
    currencyContractAddress: ADDRESS_1,
    value: "0",
    taker: ADDRESS_1,
    maker: ADDRESS_1,
    startTime: UINT256_MIN,
    endTime: UINT256_MAX,
    nft,
  },
  {
    direction: "sell" as const,
    type: "seaport" as const,
    chainId: "1",
    currencyContractAddress: ADDRESS_1,
    value: "0",
    taker: ADDRESS_1,
    maker: ADDRESS_1,
    startTime: UINT256_MIN,
    endTime: UINT256_MAX,
    nft,
  },
  {
    direction: "buy" as const,
    type: "seaport" as const,
    chainId: "42",
    currencyContractAddress: ADDRESS_1,
    value: "0",
    taker: ADDRESS_1,
    maker: ADDRESS_1,
    startTime: UINT256_MIN,
    endTime: UINT256_MAX,
    nft,
  },
  {
    direction: "sell" as const,
    type: "seaport" as const,
    chainId: "42",
    currencyContractAddress: ADDRESS_1,
    value: "0",
    taker: ADDRESS_1,
    maker: ADDRESS_1,
    startTime: UINT256_MIN,
    endTime: UINT256_MAX,
    nft,
  },
];

export const [order] = orders;
