import { Box, HStack } from "@chakra-ui/react";
import { Link } from "components/atoms/Link";
import { ConnectWallet } from "components/organisms/ConnectWallet";
import { Menu } from "components/organisms/Menu";
import { Setting } from "components/organisms/Setting";
import { Wallet } from "components/organisms/Wallet";
import { useIsWagmiConnected } from "hooks/useIsWagmiConnected";
import Image from "next/image";
import React from "react";

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
            <Menu />
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};
