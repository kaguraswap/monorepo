import { Box, HStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

import { useIsWagmiConnected } from "../../../hooks/useIsWagmiConnected";
import { Link } from "../../atoms/Link";
import { ConnectWallet } from "../../molecules/ConnectWallet";
import { Wallet } from "../../molecules/Wallet";

export const Header: React.FC = () => {
  const { isWagmiConnected } = useIsWagmiConnected();
  return (
    <Box as="section">
      <Box as="nav" alignItems={"center"} bg="bg-surface" p="4">
        <HStack justify="space-between">
          {/* FIXME: want to fix padding in Link */}
          <Link href="/">
            <Image src={"/brand/logo.png"} alt={"logo"} width="32px" height="32px" />
          </Link>
          <HStack spacing="2">
            {!isWagmiConnected && <ConnectWallet />}
            {isWagmiConnected && <Wallet />}
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};
