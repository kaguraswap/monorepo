import { Box, Flex, HStack, Icon, Select, SimpleGrid, Stack, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { MdFilterList } from "react-icons/md";

import { Nft } from "../../../../../common/dist/graphql";
import { Link } from "../../atoms/Link";
import { AddNFT } from "../../molecules/AddNFT";
import { CheckboxFilter } from "../../molecules/CheckBoxFIlter";
import { FilterDrawer } from "../../molecules/FilterDrawer";
import { NFTListItem } from "../../molecules/NFTListItem";
import { networkFilter, protocolFilter, sortByOptions, statusFilter } from "./data";

export interface NFTListProps {
  nfts: Nft[];
}

export const NFTList: React.FC<NFTListProps> = ({ nfts }) => {
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
          {nfts.map((nft, i) => (
            <Link key={i} href={`/nft/${nft.chainId}/${nft.contractAddress}/${nft.tokenId}`}>
              <NFTListItem nft={nft} />
            </Link>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
