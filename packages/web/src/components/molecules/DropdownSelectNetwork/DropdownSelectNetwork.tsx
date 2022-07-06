import { Button, Icon, Link, Popover, PopoverContent, PopoverTrigger, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiBarChart, FiRepeat } from "react-icons/fi";

import { PopoverIcon } from "../../atoms/PopoverIcon";

// TODO networkはcontractsから取る
const networks = [
  {
    name: "Rinkeby",
    chainId: "0x4",
    icon: FiBarChart,
  },
  {
    name: "Goerli",
    chainId: "0x5",
    icon: FiRepeat,
  },
];

export const DropdownSelectNetwork: React.FC = () => {
  const switchNetwork = async (chainId: string) => {
    const { ethereum } = window;
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
  };

  return (
    <Popover trigger="hover" openDelay={0} placement="bottom" defaultIsOpen={false} gutter={12}>
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <Button variant="link" rightIcon={<PopoverIcon isOpen={isOpen} />}>
              Select Network
            </Button>
          </PopoverTrigger>
          <PopoverContent p="5" width={{ base: "sm", md: "xl" }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} columnGap="6" rowGap="2">
              {networks.map((network, id) => (
                <Stack spacing="4" direction="row" p="3" key={id}>
                  <Button variant="menu" onClick={() => switchNetwork(network.chainId)}>
                    <Icon as={network.icon} boxSize="6" color="accent" />
                    <Text fontWeight="medium">{network.name}</Text>
                  </Button>
                </Stack>
              ))}
            </SimpleGrid>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};
