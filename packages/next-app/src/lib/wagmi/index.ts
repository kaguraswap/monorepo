import { getDefaultProvider } from "ethers";
import { createClient, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

export const wagmiClient = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

export const injectedConnector = new InjectedConnector();

const chains = defaultChains;

export const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: {
    qrcode: true,
  },
});
