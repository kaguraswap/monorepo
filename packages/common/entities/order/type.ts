import { OrderWithCounter as SeaportOrder } from "@opensea/seaport-js/lib/types";

import { ChainId } from "../network";
import { NFT } from "../nft";

export interface Order {
  direction: "sell" | "buy";
  type: "seaport";
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
  raw?: SeaportOrder;
}
