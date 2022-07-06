import { Box, Flex, HStack, IconButton, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { FiMenu } from "react-icons/fi";
import { useAccount } from "wagmi";

import { Link } from "../../atoms/Link";
import { ConnectedWallet } from "../../molecules/ConnectedWallet";
import { ConnectWalletButton } from "../../molecules/ConnectWalletButton";
import { DropdownSelectNetwork } from "../../molecules/DropdownSelectNetwork";

export const Header: React.FC = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
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
            {isDesktop ? (
              <>
                <HStack spacing="3">
                  <Box mr="2">{data ? <DropdownSelectNetwork /> : <></>}</Box>
                  {data ? <ConnectedWallet /> : <ConnectWalletButton expectedChainId={1} />}
                </HStack>
              </>
            ) : (
              <IconButton variant="ghost" icon={<FiMenu fontSize="1.25rem" />} aria-label="Open Menu" />
            )}
          </Flex>
        </HStack>
      </Box>
    </Box>
  );
};
