import {
  Checkbox,
  CheckboxGroup,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import React from "react";
import { FiSearch } from "react-icons/fi";

import { SelectOption } from "../../../types/SelectOption";

interface CheckboxFilterProps {
  options: SelectOption[];
  label: string;
  showSearch?: boolean;
  onChange?: (value: string[]) => void;
}

export const CheckboxFilter: React.FC<CheckboxFilterProps> = ({ options, label, showSearch }) => {
  return (
    <Stack as="fieldset" spacing={"2"}>
      <FormLabel fontWeight="semibold" as="legend" mb="0">
        {label}
      </FormLabel>
      {showSearch && (
        <InputGroup size="md" pb="1">
          <Input placeholder="Search..." rounded="md" focusBorderColor={mode("purple.500", "purple.200")} />
          <InputRightElement pointerEvents="none" color="gray.400" fontSize="lg">
            <FiSearch />
          </InputRightElement>
        </InputGroup>
      )}
      <CheckboxGroup>
        {options.map((option) => (
          <Checkbox key={option.value} value={option.value}>
            <span>{option.label}</span>
          </Checkbox>
        ))}
      </CheckboxGroup>
    </Stack>
  );
};
