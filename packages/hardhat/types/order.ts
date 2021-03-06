import { OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { SignedNftOrderV4 } from "@traderxyz/nft-swap-sdk";

export type SignedOrder = OrderWithCounter | SignedNftOrderV4;

export interface OrderFee {
  recipient: string;
  basisPoints: number;
}
