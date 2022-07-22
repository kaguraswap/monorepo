import markets from "../configs/markets.json";

type Markets = typeof markets;
export type Market = keyof Markets;

export const isMarket = (market: string): market is Market => {
  return Object.keys(markets).includes(market);
};
