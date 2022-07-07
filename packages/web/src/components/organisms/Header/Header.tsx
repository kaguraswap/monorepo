import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
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
        py="4"
        px="4"
      >
        <HStack spacing="10" justify="space-between">
          <Text>
            <Link href="/">Logo</Link>
          </Text>
          <Flex gap={"1"}>
            <HStack spacing="3">
              {data ? <DropdownSelectNetwork /> : <></>}
              {data ? <ConnectedWallet /> : <ConnectWalletButton expectedChainId={1} />}
            </HStack>
          </Flex>
        </HStack>
      </Box>
    </Box>
  );
};
