import React from "react";

import markets from "../../../../../shared/src/configs/markets.json";
import networks from "../../../../../shared/src/configs/networks.json";
import { isMarket } from "../../../../../shared/src/types/market";
import { isChainId } from "../../../../../shared/src/types/network";

export const useMarketIcons = (chainId: string) => {
  const marketIcons = React.useMemo(() => {
    if (!isChainId(chainId)) {
      return [];
    }
    return networks[chainId].markets
      .map((market: string) => {
        if (!isMarket(market)) {
          return { icon: "", url: "" };
        }
        return { icon: markets[market].icon, url: `${markets[market].url.mainnet}${markets[market].path[chainId]}` };
      })
      .filter((i) => i);
  }, [chainId]);
  return { marketIcons };
};
