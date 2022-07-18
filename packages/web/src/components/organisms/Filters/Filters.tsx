import { Box, Flex, HStack, Icon, Select, Stack, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { MdFilterList } from "react-icons/md";

import { CheckboxFilter } from "../../molecules/CheckBoxFIlter/CheckboxFilter";
import { FilterDrawer } from "../../molecules/FilterDrawer/FilterDrawer";
import { networkFilter, protocolFilter, sortByOptions, statusFilter } from "./_data";

export interface WithFilterProps {
  children: React.ReactNode;
}

export const Filters: React.FC<WithFilterProps> = ({ children }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box>
      <Flex width="full" justify="space-between">
        <HStack as="button" type="button" px="4" onClick={onToggle} borderWidth="1px" rounded="xl">
          <Icon as={MdFilterList} />
          <Text>Filters</Text>
        </HStack>
        <Select defaultValue={sortByOptions.defaultValue} rounded="xl" width="200px">
          {sortByOptions.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Flex>
      <FilterDrawer isOpen={isOpen} onClose={onClose}>
        <Stack spacing={"4"}>
          <CheckboxFilter options={statusFilter.options} label="Status" />
          <CheckboxFilter options={protocolFilter.options} label="Protocol" />
          <CheckboxFilter options={networkFilter.options} label="Network" />
        </Stack>
      </FilterDrawer>
      <Box py="4">{children}</Box>
    </Box>
  );
};
