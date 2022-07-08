import { Button, Icon, Popover, PopoverContent, PopoverTrigger, SimpleGrid, Text } from "@chakra-ui/react";
import { useNetwork } from "@thirdweb-dev/react";
import React from "react";

import config from "../../../../../common/configs/networks.json";
import { chainIdToIcon } from "../../../lib/icons";
import { PopoverIcon } from "../../atoms/PopoverIcon";

export const DropdownSelectNetwork: React.FC = () => {
  const [
    {
      data: { chain: activeChain },
    },
    switchNetwork,
  ] = useNetwork();
  const handleSwitchNetwork = async (chainId: string) => {
    if (!switchNetwork) return;
    await switchNetwork(Number(chainId));
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
            <SimpleGrid columns={2} gap={2} px={3}>
              {Object.entries(config).map(([id, network]) => (
                <Button
                  flexGrow={1}
                  size="md"
                  fontSize="sm"
                  color="black"
                  key={id}
                  onClick={() => handleSwitchNetwork(id)}
                  leftIcon={<Icon as={chainIdToIcon(id)} rounded="full" width="4" />}
                >
                  {network.name}
                </Button>
              ))}
            </SimpleGrid>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};
