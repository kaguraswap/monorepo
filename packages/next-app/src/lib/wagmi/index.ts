import { getDefaultProvider } from "ethers";
import { createClient } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import networks from "../../../../shared/src/configs/networks.json";

export const wagmiClient = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

export const injectedConnector = new InjectedConnector();

const chains = Object.entries(networks).map(([chainId, { name, rpc }]) => {
  return {
    id: Number(chainId),
    name,
    network: name,
    rpcUrls: { default: rpc },
  };
});

export const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: {
    qrcode: true,
  },
});
