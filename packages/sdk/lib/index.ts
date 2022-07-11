import { ethers } from "ethers";

import { Order } from "./order";

export class KaguraSDK {
  order: Order;
  constructor(provider: ethers.providers.JsonRpcProvider) {
    this.order = new Order(provider);
  }
}
