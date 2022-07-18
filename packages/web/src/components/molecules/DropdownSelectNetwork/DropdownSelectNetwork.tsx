import { Button, Icon, Popover, PopoverContent, PopoverTrigger, SimpleGrid, Text } from "@chakra-ui/react";
import router from "next/router";
import React from "react";

import config from "../../../../../common/configs/networks.json";
import { PopoverIcon } from "../../atoms/PopoverIcon";

export interface DropdownSelectNetworkProps {
  chainId?: any;
}

export const DropdownSelectNetwork: React.FC<DropdownSelectNetworkProps> = ({ chainId }) => {
  const handleSwitchNetwork = async (chainId: string) => {
    // TODO
    console.log("chainId", chainId);
    router.push(`/`);
  };

  return (
    <Popover trigger="click" openDelay={0} placement="bottom" defaultIsOpen={false} gutter={12}>
      {/* {({ isOpen }) => (
        <>
          {chainId ? (
            <PopoverTrigger>
              <Button
                size="sm"
                color="gray.800"
                rightIcon={<PopoverIcon isOpen={isOpen} />}
                maxWidth={{ base: "24", md: "none" }}
              >
                <Icon as={ChainIDToIcon[chainId]} rounded="full" width="4" />
                <Text overflow={"hidden"}>{ChainIDToName[chainId]}</Text>
              </Button>
            </PopoverTrigger>
          ) : (
            <></>
          )}
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
                  leftIcon={
                    <Icon as={ChainIDToIcon[Number(id) as KAGURA_SUPPORTED_CHAIN_ID]} rounded="full" width="4" />
                  }
                >
                  {network.name}
                </Button>
              ))}
            </SimpleGrid>
          </PopoverContent>
        </>
      )} */}
    </Popover>
  );
};
