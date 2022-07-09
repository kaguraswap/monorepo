import { Box, Flex, HStack, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { useAccount } from "wagmi";

import { Link } from "../../atoms/Link";
import { ConnectedWallet } from "../../molecules/ConnectedWallet";
import { ConnectWalletButton } from "../../molecules/ConnectWalletButton";
import { DropdownSelectNetwork } from "../../molecules/DropdownSelectNetwork";

export const Header: React.FC = () => {
  const [{ data }] = useAccount();
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
              {data ? <DropdownSelectNetwork /> : <></>}
              {data ? <ConnectedWallet /> : <ConnectWalletButton size="sm" />}
            </HStack>
          </Flex>
        </HStack>
      </Box>
    </Box>
  );
};
