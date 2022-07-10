import { OrderWithCounter as SeaportOrder } from "@opensea/seaport-js/lib/types";
import { SignedNftOrderV4 as ZeroExOrder } from "@traderxyz/nft-swap-sdk";

import { ChainId } from "../network";
import { NFT } from "../nft";

export type OrderDirection = "sell" | "buy";
export type RawOrder = SeaportOrder | ZeroExOrder;
export type OrderType = "seaport" | "zeroEx";

export interface OrderFee {
  recipient: string;
  basisPoints: number;
}

export interface Order {
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
  hash?: string;
  raw?: RawOrder;
}
