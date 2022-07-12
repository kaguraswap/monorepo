import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useClipboard,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useAccount, useAddress, useDisconnect } from "@thirdweb-dev/react";
import router from "next/router";
import React from "react";
import { IoCopy, IoHome, IoWalletOutline } from "react-icons/io5";

import { shortenAddress } from "../../../../../common/utils/wallet";

interface ConnectedWalletProps {
  tokenAddress?: string;
}

export const ConnectedWallet: React.FC<ConnectedWalletProps> = () => {
  const toast = useToast();
  const { onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  const [{ data }] = useAccount();
  const address = useAddress();
  const disconnect = useDisconnect();
  const { onCopy } = useClipboard(address || "");

  const switchWallet = async () => {
    const provider = data?.connector?.getProvider();
    if (!provider?.isMetaMask || !provider.request) {
      return;
    }

    await provider.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    });
    onClose();
  };

  const disconnectWallet = () => {
    disconnect();
    onClose();
  };

  const copyAddress = () => {
    onCopy();
    toast({
      title: "Address copied to clipboard",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Flex align="center" gap={2}>
      {address && (
        <>
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
                <Flex direction={{ base: "column", md: "column" }} gap={2} px={3}>
                  <Flex width="full">
                    <Button size="sm" variant="outline" width="full" onClick={copyAddress}>
                      {shortenAddress(address) || ""}
                    </Button>
                    <IconButton
                      onClick={copyAddress}
                      mr="-px"
                      borderRight="none"
                      aria-label="Add to friends"
                      variant="outline"
                      size="sm"
                      icon={<Icon as={IoCopy} />}
                    />
                  </Flex>
                  <Button
                    size="sm"
                    color="gray.600"
                    onClick={() => {
                      router.push(`/accounts/${address}`);
                    }}
                    leftIcon={<Icon as={IoHome} boxSize={4} color="gray.500" />}
                  >
                    MyPage
                  </Button>
                  {data?.connector?.getProvider()?.isMetaMask && (
                    <Button size="sm" color="gray.600" onClick={switchWallet}>
                      Switch Wallet
                    </Button>
                  )}
                  <Button onClick={disconnectWallet} colorScheme="red" size="sm">
                    Disconnect
                  </Button>
                </Flex>
              </PopoverContent>
            </Box>
          </Popover>
        </>
      )}
    </Flex>
  );
};
