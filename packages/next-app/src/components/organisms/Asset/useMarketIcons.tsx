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
          return "";
        }
        return markets[market].icon;
      })
      .filter((i: string) => i);
  }, [chainId]);
  return { marketIcons };
};
