import { OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { SignedNftOrderV4 } from "@traderxyz/nft-swap-sdk";

import { Record } from "../../value-objects/record";
import { ChainId } from "../network";
import { NFT } from "../nft";

export type OrderDirection = "sell" | "buy";
export type SignedOrder = OrderWithCounter | SignedNftOrderV4;
export type OrderType = "seaport" | "zeroEx";

export interface OrderFee {
  recipient: string;
  basisPoints: number;
}

export interface Order extends Record {
  direction: OrderDirection;
  type: OrderType;
  chainId: ChainId;
  currencyContractAddress: string;
  value: string;
  taker: string;
  maker: string;
  startTime: string;
  endTime: string;
  nft: NFT;
  isValid?: boolean;
  signedOrder?: SignedOrder;
}
