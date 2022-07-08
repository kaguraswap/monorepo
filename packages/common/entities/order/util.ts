import canonicalize from "canonicalize";

import { Order } from "./type";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Hash = require("ipfs-only-hash");

export const toHash = async (order: object) => {
  return await Hash.of(canonicalize(order));
};

export const verifyOrderHash = async (hash: string, order: Order) => {
  const expected = await toHash(order);
  return expected === hash;
};
