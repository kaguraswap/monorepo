export interface Order {
  direction: "sell" | "buy";
  type: "seaport";
  chainId: string;
  nftContractAddress: string;
  nftTokenId: string;
  currencyContractAddress: string;
  value: string;
  taker: string;
  maker: string;
  startTime: string;
  endTime: string;
  raw: any;
}
