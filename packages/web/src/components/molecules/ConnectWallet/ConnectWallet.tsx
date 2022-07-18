import { Button, Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import React from "react";
import { useConnect } from "wagmi";

import { injectedConnector } from "../../../lib/wagmi";

interface ConnectWalletProps {
  size?: string;
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({ size = "sm" }) => {
  const { connect } = useConnect();

  return (
    <Popover trigger="hover" openDelay={0} placement="bottom" defaultIsOpen={false} gutter={12}>
      <PopoverTrigger>
        <Button size={size} color="gray.800">
          Connect Wallet
        </Button>
      </PopoverTrigger>
      <PopoverContent p="5" width={{ base: "sm", md: "md" }}>
        <Button flexGrow={1} size="sm" color="black" onClick={() => connect({ connector: injectedConnector })}>
          Metamask
        </Button>
      </PopoverContent>
    </Popover>
  );
};
