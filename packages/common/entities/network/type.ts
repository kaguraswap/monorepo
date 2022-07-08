import networks from "../../configs/networks.json";

type Networks = typeof networks;
export type ChainId = keyof Networks;

export const isChainId = (chainId: string): chainId is ChainId => {
  return Object.keys(networks).includes(chainId);
};
