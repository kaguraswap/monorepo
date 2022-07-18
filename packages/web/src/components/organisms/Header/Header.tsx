import { Box, Button, Flex, HStack, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

import { useIsWagmiConnected } from "../../../hooks/useIsWagmiConnected";
import { Link } from "../../atoms/Link";
import { ConnectedWallet } from "../../molecules/ConnectedWallet";
import { ConnectWalletButton } from "../../molecules/ConnectWalletButton";

export const Header: React.FC = () => {
  const { isWagmiConnected } = useIsWagmiConnected();
  console.log(isWagmiConnected);

  return (
    <Box as="section">
      <Box
        as="nav"
        minH={"64px"}
        alignItems={"center"}
        bg="bg-surface"
        boxShadow={useColorModeValue("sm", "sm-dark")}
        p="4"
      >
        <HStack spacing="10" justify="space-between">
          <Link href="/">
            <Image src={"/brand/logo_transparent.png"} alt={"logo"} width="48px" height="48px" />
          </Link>
          <Flex gap={"1"}>
            <HStack spacing="3">
              {!isWagmiConnected && <ConnectWalletButton />}
              {isWagmiConnected && <ConnectedWallet />}
            </HStack>
          </Flex>
        </HStack>
      </Box>
    </Box>
  );
};
