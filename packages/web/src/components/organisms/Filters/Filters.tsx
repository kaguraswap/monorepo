import {
  Button,
  Flex,
  HStack,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useConnect } from "@thirdweb-dev/react";
import { CheckboxFilter } from "components/molecules/CheckboxFilter";
import React from "react";

import { supportedChains } from "../../../lib/rpc";

interface FiltersProps {
  size: string;
}

export const Filters: React.FC<FiltersProps> = ({ size }) => {
  const chainIdOptions = supportedChains.map((chain) => {
    return { label: chain.name, value: chain.id.toString() };
  });
  return (
    <>
      <Flex justify="space-between" align="center" display={{ base: "none", md: "flex" }}>
        <HStack spacing="6">
          <Text color={useColorModeValue("gray.600", "gray.400")} fontWeight="medium" fontSize="sm">
            Filter by
          </Text>
          <SimpleGrid display="inline-grid" spacing="4" columns={4}>
            <CheckboxFilter options={chainIdOptions} label="chain" />
          </SimpleGrid>
        </HStack>

        <HStack flexShrink={0}>
          <Text
            as="label"
            htmlFor="sort-by"
            color={useColorModeValue("gray.600", "gray.400")}
            fontWeight="medium"
            fontSize="sm"
            whiteSpace="nowrap"
          >
            Sort by
          </Text>
          {/* <SortbySelect /> */}
        </HStack>
      </Flex>
    </>
  );
};
