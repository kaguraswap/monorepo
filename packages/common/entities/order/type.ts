import { OrderWithCounter as SeaportOrder } from "@opensea/seaport-js/lib/types";

export interface Order {
  direction: "sell" | "buy";
  type: "seaport";
  chainId: string;
  nftContractAddress: string;
  nftTokenId: string;
  currencyContractAddress: string;
  value: string;
  taker: string;
  maker: string;
  startTime: string;
  endTime: string;
  isValid?: boolean;
  hash?: string;
  raw?: SeaportOrder;
}
