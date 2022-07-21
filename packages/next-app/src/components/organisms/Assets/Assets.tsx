import { Box, Flex, HStack, Icon, Select, SimpleGrid, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { Link } from "components/atoms/Link";
import { AddAsset } from "components/organisms/AddAsset";
import { AssetListItem } from "components/organisms/AssetListItem";
import { arrayify } from "lib/utils";
import { useRouter } from "next/router";
import qs from "query-string";
import React from "react";
import { MdFilterList } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroller";

import { AssetsFragment } from "../../../../../hasura/dist/graphql";
import networks from "../../../../../shared/src/configs/networks.json";
import { ChainId } from "../../../../../shared/src/types/network";
import { CheckboxFilter } from "./CheckboxFilter";
import { sortByOptions, statusFilter } from "./data";
import { FilterDrawer } from "./FilterDrawer";
import { useOptions } from "./useOptions";

export interface QueryCondition {
  [key: string]: string | string[];
}

export interface AssetsProps {
  assets: AssetsFragment[];
  loadMore?: () => void;
}

export const Assets: React.FC<AssetsProps> = ({ assets, loadMore }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const router = useRouter();

  const handleConditionChange = (key: string, value: string[]) => {
    const query = qs.stringify({ ...router.query, [key]: value });
    router.push(`/?${query}`, undefined, { shallow: true });
  };

  const { networkFilterOptions, protocolFilterOptions } = useOptions();

  return (
    <Box as="section">
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
        {loadMore ? (
          <InfiniteScroll
            pageStart={0}
            loadMore={() => loadMore()}
            hasMore={true || false}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
          >
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
          </InfiniteScroll>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};
