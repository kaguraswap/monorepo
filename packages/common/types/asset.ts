import { Collection } from "./collection";
import { Order } from "./order";

export interface Asset {
  chainId: number;
  contractAddress: string;
  tokenId: string;
  image: string;
  name: string;
  description: string;
  collection?: Collection;
  orders?: Order[];
}
