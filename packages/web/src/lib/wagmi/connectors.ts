import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import networks from "../../../../common/configs/networks.json";

const chains = Object.entries(networks).map(([id, { name, rpc }]) => {
  return { id: Number(id), name, network: name, rpcUrls: rpc };
});

const connector = new WalletConnectConnector({
  chains,
  options: {
    qrcode: true,
  },
});
