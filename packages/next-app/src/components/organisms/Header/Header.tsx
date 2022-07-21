import { Box, HStack } from "@chakra-ui/react";
import { Link } from "components/atoms/Link";
import { ConnectWallet } from "components/molecules/ConnectWallet";
import { Wallet } from "components/molecules/Wallet";
import { useIsWagmiConnected } from "hooks/useIsWagmiConnected";
import Image from "next/image";
import React from "react";

import { Setting } from "../../molecules/Setting";

export const Header: React.FC = () => {
  const { isWagmiConnected } = useIsWagmiConnected();
  return (
    <Box as="header">
      <Box as="nav" alignItems={"center"} bg="bg-surface" p="4">
        <HStack justify="space-between">
          {/* FIXME: want to fix padding in Link */}
          <Link href="/">
            <Image src={"/brand/logo.png"} alt={"logo"} width="32px" height="32px" />
          </Link>
          <HStack spacing="2">
            <Setting />
            {!isWagmiConnected && <ConnectWallet />}
            {isWagmiConnected && <Wallet />}
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};
