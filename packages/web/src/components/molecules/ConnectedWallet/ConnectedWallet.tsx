import { Box, Button, Flex, Icon, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { IoWalletOutline } from "react-icons/io5";
import { useAccount, useDisconnect } from "wagmi";

import { shortenAddress } from "../../../../../common/utils/wallet";

interface ConnectedWalletProps {
  tokenAddress?: string;
}

export const ConnectedWallet: React.FC<ConnectedWalletProps> = () => {
  const { onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const disconnectWallet = () => {
    disconnect();
    onClose();
  };

  return (
    <Flex align="center" gap={2}>
      <Popover trigger="hover" openDelay={0} placement="bottom" defaultIsOpen={false} gutter={12}>
        <Box>
          <PopoverTrigger>
            <Button
              size="sm"
              color="gray.800"
              leftIcon={<Icon as={IoWalletOutline} color="gray.500" boxSize={4} />}
              onClick={onOpen}
            >
              {shortenAddress(address)}
            </Button>
          </PopoverTrigger>
          <PopoverContent p="5" width={{ base: "sm", md: "sm" }}>
            <Flex direction={"column"} gap={2} px={3}>
              <Button onClick={disconnectWallet} colorScheme="red" size="sm">
                Disconnect
              </Button>
            </Flex>
          </PopoverContent>
        </Box>
      </Popover>
    </Flex>
  );
};
