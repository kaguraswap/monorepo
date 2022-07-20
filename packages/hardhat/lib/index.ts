import { ethers } from "ethers";

import { Order, Overrides } from "./order";

export class KaguraSDK {
  order: Order;
  constructor(provider: ethers.providers.JsonRpcProvider, overrides?: Overrides) {
    this.order = new Order(provider, overrides);
  }
}
