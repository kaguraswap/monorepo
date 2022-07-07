import { Button, Flex, Image, Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { useConnect } from "@thirdweb-dev/react";
import React from "react";

interface ConnectWalletButtonProps {
  expectedChainId: number;
}

const connectorIdToImageUrl: Record<string, string> = {
  MetaMask: "https://thirdweb.com/logos/metamask-fox.svg",
  WalletConnect: "https://thirdweb.com/logos/walletconnect-logo.svg",
  "Coinbase Wallet": "https://thirdweb.com/logos/coinbase-wallet-logo.svg",
  Injected: "https://thirdweb.com//logos/wallet.png",
};

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = () => {
  const [{ data, loading }, connect] = useConnect();

  return (
    <Popover trigger="hover" openDelay={0} placement="bottom" defaultIsOpen={false} gutter={12}>
      <PopoverTrigger>
        <Button size="sm" color="gray.800">
          Connect Wallet
        </Button>
      </PopoverTrigger>
      <PopoverContent p="5" width={{ base: "sm", md: "md" }}>
        {!loading && (
          <Flex direction={{ base: "column", md: "column" }} gap={2} px={3}>
            {data.connectors
              .filter((c) => c.ready)
              .map((_connector) => {
                if (!_connector.ready) {
                  return null;
                }
                return (
                  <Button
                    flexGrow={1}
                    size="sm"
                    color="black"
                    key={_connector.name}
                    isLoading={loading && data?.connector?.name === _connector?.name}
                    onClick={() => connect(_connector)}
                    leftIcon={
                      <Image
                        maxWidth={6}
                        src={
                          Object.keys(connectorIdToImageUrl).includes(_connector.name)
                            ? connectorIdToImageUrl[_connector.name]
                            : connectorIdToImageUrl.Injected
                        }
                        alt={_connector.name}
                      />
                    }
                  >
                    {_connector.name !== "Injected" ? _connector.name : "Mobile Wallet"}
                  </Button>
                );
              })}
          </Flex>
        )}
      </PopoverContent>
    </Popover>
  );
};
