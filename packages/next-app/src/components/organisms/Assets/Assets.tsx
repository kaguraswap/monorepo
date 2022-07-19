import { Box, Flex, HStack, Icon, Select, SimpleGrid, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { Link } from "components/atoms/Link";
import { AddNFT } from "components/molecules/AddNFT";
import { AssetListItem } from "components/molecules/AssetListItem";
import { CheckboxFilter } from "components/molecules/CheckBoxFIlter";
import { FilterDrawer } from "components/molecules/FilterDrawer";
import React from "react";
import { MdFilterList } from "react-icons/md";

import networks from "../../../../../common/configs/networks.json";
import { AssetsFragment } from "../../../../../common/dist/graphql";
import { ChainId } from "../../../../../common/types/network";
import { networkFilter, protocolFilter, sortByOptions, statusFilter } from "./data";

export interface AssetsProps {
  assets: AssetsFragment[];
}

export const Assets: React.FC<AssetsProps> = ({ assets }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box>
      <Flex width="full" justify="space-between">
        <HStack as="button" type="button" px="4" onClick={onToggle} borderWidth="1px" rounded="xl">
          <Icon as={MdFilterList} />
          <Text>Filters</Text>
        </HStack>
        <HStack>
          <Select defaultValue={sortByOptions.defaultValue} rounded="xl" width="180px">
            {sortByOptions.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <AddNFT />
        </HStack>
      </Flex>
      <FilterDrawer isOpen={isOpen} onClose={onClose}>
        <Stack spacing={"4"}>
          <CheckboxFilter options={statusFilter.options} label="Status" />
          <CheckboxFilter options={protocolFilter.options} label="Protocol" />
          <CheckboxFilter options={networkFilter.options} label="Network" />
          {/* TODO: Contract Address */}
        </Stack>
      </FilterDrawer>
      <Box py="4">
        <SimpleGrid columns={{ base: 2, md: 8 }} gap="2">
          {assets.map((asset, i) => {
            const network = networks[asset.chainId as ChainId].name;
            return (
              <Link key={i} href={`/assets/${asset.chainId}/${asset.contractAddress}/${asset.tokenId}`}>
                <AssetListItem
                  network={network}
                  tokenId={asset.tokenId}
                  image={asset.metadata.image}
                  name={asset.metadata.name}
                />
              </Link>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
