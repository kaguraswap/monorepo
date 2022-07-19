import { Checkbox, CheckboxGroup, FormLabel, Stack } from "@chakra-ui/react";
import React from "react";
import { SelectOption } from "types/SelectOption";

interface CheckboxFilterProps {
  options: SelectOption[];
  label: string;
  onChange?: (value: string[]) => void;
}

export const CheckboxFilter: React.FC<CheckboxFilterProps> = ({ options, label }) => {
  return (
    <Stack spacing={"2"}>
      <FormLabel fontWeight="bold">{label}</FormLabel>
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