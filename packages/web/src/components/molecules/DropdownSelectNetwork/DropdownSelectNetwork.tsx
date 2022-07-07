import { Button, Flex, Icon, Popover, PopoverContent, PopoverTrigger, Text } from "@chakra-ui/react";
import { useNetwork } from "@thirdweb-dev/react";
import React from "react";
import { FiBarChart, FiRepeat } from "react-icons/fi";

import { PopoverIcon } from "../../atoms/PopoverIcon";

// TODO networkはcontractsから取る
const networks = [
  {
    name: "Rinkeby",
    chainId: 4,
    icon: FiBarChart,
  },
  {
    name: "Goerli",
    chainId: 5,
    icon: FiRepeat,
  },
];

export const DropdownSelectNetwork: React.FC = () => {
  const [
    {
      data: { chain: activeChain },
    },
    switchNetwork,
  ] = useNetwork();
  const handleSwitchNetwork = async (chainId: number) => {
    if (!switchNetwork) return;
    await switchNetwork(chainId);
  };

  return (
    <Popover trigger="hover" openDelay={0} placement="bottom" defaultIsOpen={false} gutter={12}>
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <Button
              size="sm"
              color="gray.800"
              rightIcon={<PopoverIcon isOpen={isOpen} />}
              maxWidth={{ base: "24", md: "none" }}
            >
              <Text overflow={"hidden"}> {activeChain?.name}</Text>
            </Button>
          </PopoverTrigger>
          <PopoverContent p="5" width={{ base: "sm", md: "md" }}>
            <Flex direction={{ base: "column", md: "column" }} gap={2} px={3}>
              {networks.map((network, id) => (
                <Button
                  flexGrow={1}
                  size="sm"
                  color="black"
                  key={id}
                  onClick={() => handleSwitchNetwork(network.chainId)}
                  leftIcon={<Icon as={network.icon} boxSize="6" color="accent" />}
                >
                  {network.name}
                </Button>
              ))}
            </Flex>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};
