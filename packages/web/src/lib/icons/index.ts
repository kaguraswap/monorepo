import { Avalanche, Ethereum, Polygon } from "@thirdweb-dev/chain-icons";

type chainId = "1" | "42" | "137" | "43113" | "43114" | "80001";

const iconMapping = {
  1: Ethereum,
  42: Ethereum,
  137: Polygon,
  43113: Avalanche,
  43114: Avalanche,
  80001: Polygon,
};

export const chainIdToIcon = (chainId: string) => {
  return iconMapping[chainId as chainId];
};
