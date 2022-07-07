import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useClipboard,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useAccount, useAddress, useBalance, useDisconnect } from "@thirdweb-dev/react";
import React from "react";
import { IoCopy, IoWalletOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

interface ConnectedWalletProps {
  tokenAddress?: string;
}

function shortenAddress(str: string) {
  return `${str.substring(0, 6)}...${str.substring(str.length - 4)}`;
}

export const ConnectedWallet: React.FC<ConnectedWalletProps> = ({ tokenAddress }) => {
  const toast = useToast();
  const { onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  const [{ data }] = useAccount();
  const address = useAddress();
  const disconnect = useDisconnect();
  const { onCopy } = useClipboard(address || "");
  const { data: balance } = useBalance(tokenAddress);

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
          {balance && (
            <Stack
              direction="row"
              display={{ base: "none", md: "flex" }}
              height="32px"
              px="10px"
              borderRadius="md"
              borderColor="gray.200"
              borderWidth="1px"
              align="center"
            >
              <Icon as={RiMoneyDollarCircleLine} boxSize={4} color="gray.500" />
              <Text fontSize="sm" fontWeight="semibold" whiteSpace="nowrap">
                {balance.displayValue.slice(0, 6)} {balance.symbol}
              </Text>
            </Stack>
          )}
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
                    <IconButton
                      onClick={copyAddress}
                      mr="-px"
                      borderRight="none"
                      aria-label="Add to friends"
                      variant="outline"
                      size="sm"
                      icon={<Icon as={IoCopy} />}
                    />
                    <Button size="sm" variant="outline" width="full" onClick={copyAddress}>
                      {shortenAddress(address) || ""}
                    </Button>
                  </Flex>
                  {data?.connector?.getProvider()?.isMetaMask && (
                    <Button size="sm" color="gray.400" onClick={switchWallet}>
                      Switch
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
