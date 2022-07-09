import { Box, Flex, HStack, Image, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useAccount } from "wagmi";

import { Link } from "../../atoms/Link";
import { ConnectedWallet } from "../../molecules/ConnectedWallet";
import { ConnectWalletButton } from "../../molecules/ConnectWalletButton";
import { DropdownSelectNetwork } from "../../molecules/DropdownSelectNetwork";

export const Header: React.FC = () => {
  const [isConnectedState, setIsConnectedState] = React.useState(false);
  const { isConnected } = useAccount();

  React.useEffect(() => setIsConnectedState(isConnected), [isConnected]);

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
            <Image src={"/brand/logo_transparent.png"} alt={"logo"} draggable="false" w="12" h="12" />
          </Link>
          <Flex gap={"1"}>
            <HStack spacing="3">
              {/* {isConnectedState ? <DropdownSelectNetwork /> : <></>}
              {isConnectedState ? <ConnectedWallet /> : <ConnectWalletButton size="sm" />} */}
              <ConnectWalletButton />
            </HStack>
          </Flex>
        </HStack>
      </Box>
    </Box>
  );
};
