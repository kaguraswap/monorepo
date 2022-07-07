import canonicalize from "canonicalize";

import { Order } from "../../../../common/types/order";
import { order } from "../../../../common/utils/fixture";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Hash = require("ipfs-only-hash");

export const createOrder = (chainId: string, nftContractAddress: string, nftTokenId: string) => {
  return { ...order, chainId, nftContractAddress, nftTokenId };
};

export const toHash = async (order: Order) => {
  return await Hash.of(canonicalize(order.raw));
};

export const verifyOrderHash = async (hash: string, order: Order) => {
  const expected = await toHash(order);
  return expected === hash;
};
