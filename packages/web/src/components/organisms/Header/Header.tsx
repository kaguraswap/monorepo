import { Box, Flex, HStack, IconButton, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { FiMenu } from "react-icons/fi";

import { Link } from "../../atoms/Link";
import { DropdownMyMenu } from "../../molecules/DropdownMyMenu";
import { DropdownSelectNetwork } from "../../molecules/DropdownSelectNetwork";
import { ModalConnectWallet } from "../../molecules/ModalConnectWallet";

export const Header: React.FC = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
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
                  <DropdownSelectNetwork />
                  <ModalConnectWallet />
                  <DropdownMyMenu />
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
