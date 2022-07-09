import "../../../lib/wagmi/connectors";

import { Button, Flex, Image, Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import React from "react";
import { useConnect } from "wagmi";

interface ConnectWalletButtonProps {
  size: string;
}

const connectorIdToImageUrl: Record<string, string> = {
  MetaMask: "https://thirdweb.com/logos/metamask-fox.svg",
  WalletConnect: "https://thirdweb.com/logos/walletconnect-logo.svg",
  "Coinbase Wallet": "https://thirdweb.com/logos/coinbase-wallet-logo.svg",
  Injected: "https://thirdweb.com//logos/wallet.png",
};

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ size }) => {
  const { isLoading, connectors, connect } = useConnect();

  return (
    <Popover trigger="hover" openDelay={0} placement="bottom" defaultIsOpen={false} gutter={12}>
      <PopoverTrigger>
        <Button size={size} color="gray.800">
          Connect Wallet
        </Button>
      </PopoverTrigger>
    </Popover>
  );
};
