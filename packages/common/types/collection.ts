import { Asset } from "./asset";

export interface Collection {
  chainId: number;
  contractAddress: string;
  name: string;
  description: string;
  banner: string;
  logo: string;
  assets?: Asset[];
}
