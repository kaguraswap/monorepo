import { Arbitrum, Avalanche, Ethereum, Fantom, Optimism, Polygon } from "@thirdweb-dev/chain-icons";
import { ChainId, SUPPORTED_CHAIN_IDS } from "@thirdweb-dev/sdk";
import { SVGProps } from "react";
import { defaultChains } from "wagmi";

export declare enum KaguraChainId {
  Mainnet = 1,
  Rinkeby = 4,
  Goerli = 5,
  Kovan = 42,
  Polygon = 137,
  Mumbai = 80001,
  Harmony = 1666600000,
  Localhost = 1337,
  Hardhat = 31337,
  Fantom = 250,
  FantomTestnet = 4002,
  Avalanche = 43114,
  AvalancheFujiTestnet = 43113,
  Optimism = 10,
  OptimismTestnet = 69,
  Arbitrum = 42161,
  ArbitrumTestnet = 421611,
}

export type KAGURA_SUPPORTED_CHAIN_ID =
  | KaguraChainId.Mainnet
  | KaguraChainId.Rinkeby
  | KaguraChainId.Goerli
  | KaguraChainId.Kovan
  | KaguraChainId.Polygon
  | KaguraChainId.Mumbai
  | KaguraChainId.Fantom
  | KaguraChainId.FantomTestnet
  | KaguraChainId.Avalanche
  | KaguraChainId.AvalancheFujiTestnet
  | KaguraChainId.Optimism
  | KaguraChainId.OptimismTestnet
  | KaguraChainId.Arbitrum
  | KaguraChainId.ArbitrumTestnet
  | KaguraChainId.OptimismTestnet;

export const ChainIDToName: Record<KAGURA_SUPPORTED_CHAIN_ID, string> = {
  [ChainId.Mainnet]: "Ethereum Mainnet",
  42: "Kovan",
  [ChainId.Rinkeby]: "Rinkeby",
  [ChainId.Goerli]: "Goerli",
  [ChainId.Polygon]: "Polygon Mainnet",
  [ChainId.Mumbai]: "Mumbai",
  [ChainId.Fantom]: "Fantom Opera",
  [ChainId.FantomTestnet]: "Fantom Testnet",
  [ChainId.Avalanche]: "Avalanche",
  [ChainId.AvalancheFujiTestnet]: "Avalanche Fuji Testnet",
  [ChainId.Optimism]: "Optimism",
  [ChainId.OptimismTestnet]: "Optimism Kovan",
  [ChainId.Arbitrum]: "Arbitrum One",
  [ChainId.ArbitrumTestnet]: "Arbitrum Rinkeby",
};

export const supportedChains = defaultChains.filter((c) => SUPPORTED_CHAIN_IDS.includes(c.id));

export const ChainIDToIcon: Record<KAGURA_SUPPORTED_CHAIN_ID, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  [ChainId.Mainnet]: Ethereum,
  [ChainId.Rinkeby]: Ethereum,
  42: Ethereum,
  [ChainId.Goerli]: Ethereum,
  [ChainId.Polygon]: Polygon,
  [ChainId.Mumbai]: Polygon,
  [ChainId.Fantom]: Fantom,
  [ChainId.FantomTestnet]: Fantom,
  [ChainId.Avalanche]: Avalanche,
  [ChainId.AvalancheFujiTestnet]: Avalanche,
  [ChainId.Optimism]: Optimism,
  [ChainId.OptimismTestnet]: Optimism,
  [ChainId.Arbitrum]: Arbitrum,
  [ChainId.ArbitrumTestnet]: Arbitrum,
};
