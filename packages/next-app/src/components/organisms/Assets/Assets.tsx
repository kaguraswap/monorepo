import { Box, Flex, HStack, Icon, Select, SimpleGrid, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { Link } from "components/atoms/Link";
import { AddAsset } from "components/molecules/AddAsset";
import { AssetListItem } from "components/molecules/AssetListItem";
import { CheckboxFilter } from "components/molecules/CheckBoxFIlter";
import { FilterDrawer } from "components/molecules/FilterDrawer";
import { arrayify } from "lib/utils";
import { useRouter } from "next/router";
import qs from "query-string";
import React from "react";
import { MdFilterList } from "react-icons/md";

import networks from "../../../../../common/configs/networks.json";
import { AssetsFragment } from "../../../../../common/dist/graphql";
import { ChainId } from "../../../../../common/types/network";
import { sortByOptions, statusFilter } from "./data";
import { useOptions } from "./useOptions";

export interface QueryCondition {
  [key: string]: string | string[];
}

export interface AssetsProps {
  assets: AssetsFragment[];
}

export const Assets: React.FC<AssetsProps> = ({ assets }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const router = useRouter();

  const handleConditionChange = (key: string, value: string[]) => {
    const query = qs.stringify({ ...router.query, [key]: value });
    router.push(`/?${query}`, undefined, { shallow: true });
  };

  const { networkFilterOptions, protocolFilterOptions } = useOptions();

  return (
    <Box>
      <Flex width="full" justify="space-between">
        <HStack as="button" type="button" px="4" onClick={onToggle} borderWidth="1px" rounded="xl">
          <Icon as={MdFilterList} />
          <Text>Filters</Text>
        </HStack>
        <HStack>
          <Select
            defaultValue={sortByOptions.defaultValue}
            rounded="xl"
            width="180px"
            placeholder="Sort"
            onChange={(e) => {
              handleConditionChange("orderBy", [e.target.value]);
            }}
          >
            {sortByOptions.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <AddAsset />
        </HStack>
      </Flex>
      <FilterDrawer isOpen={isOpen} onClose={onClose}>
        <Stack spacing={"4"}>
          <CheckboxFilter
            options={networkFilterOptions}
            label="Network"
            onChange={(value) => {
              handleConditionChange("chainId", value);
            }}
            value={arrayify(router.query.chainId)}
          />
          <CheckboxFilter
            options={statusFilter.options}
            label="Status"
            onChange={(value) => {
              handleConditionChange("validOrders-direction", value);
            }}
            value={arrayify(router.query["validOrders-direction"])}
          />
          <CheckboxFilter
            options={protocolFilterOptions}
            label="Protocol"
            onChange={(value) => {
              handleConditionChange("validOrders-protocol", value);
            }}
            value={arrayify(router.query["validOrders-protocol"])}
          />
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
                  contractAddress={asset.contractAddress}
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
