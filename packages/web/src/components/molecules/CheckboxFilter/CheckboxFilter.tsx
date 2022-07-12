import {
  Box,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Stack,
  StackProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { PopoverIcon } from "components/atoms/PopoverIcon";
import router from "next/router";
import React from "react";
import { FiSearch } from "react-icons/fi";

interface CheckboxFilterProps {
  hideLabel?: boolean;
  options: Array<{ label: string; value: string; count?: number }>;
  label?: string;
  onChange?: (value: string[]) => void;
  spacing?: StackProps["spacing"];
  showSearch?: boolean;
}

export const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  options,
  label,
  hideLabel,
  spacing = "2",
  showSearch,
  ...rest
}) => {
  const handleQueryChanges = (key: string, id: string) => {
    router.push({ query: { ...router.query, [key]: id } }, undefined, { shallow: true });
  };
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <HStack
          justify="space-between"
          position="relative"
          as="button"
          fontSize="sm"
          borderWidth="1px"
          zIndex="11"
          rounded="lg"
          paddingStart="3"
          paddingEnd="2"
          paddingY="1.5"
          spacing="1"
          _expanded={{ bg: useColorModeValue("gray.100", "gray.700") }}
          _selected={{ bg: "blue.50", borderColor: "blue.500" }}
        >
          <Text fontWeight="medium">{label}</Text>
          <PopoverIcon isOpen={false} fontSize="xl" color="gray.400" />
        </HStack>
      </PopoverTrigger>
      <PopoverContent _focus={{ shadow: "none", outline: 0 }} _focusVisible={{ shadow: "outline" }}>
        <PopoverBody padding="6">
          <Stack as="fieldset" spacing={spacing}>
            {!hideLabel && (
              <FormLabel fontWeight="semibold" as="legend" mb="0">
                {label}
              </FormLabel>
            )}
            {showSearch && (
              <InputGroup size="md" pb="1">
                <Input placeholder="Search..." rounded="md" focusBorderColor={"blue.500"} />
                <InputRightElement pointerEvents="none" color="gray.400" fontSize="lg">
                  <FiSearch />
                </InputRightElement>
              </InputGroup>
            )}
            <RadioGroup>
              <Stack direction="column">
                {options.map((option) => (
                  <Radio
                    key={option.value}
                    value={option.value}
                    colorScheme="blue"
                    onChange={() => handleQueryChanges("chainId", option.value)}
                  >
                    <span>{option.label}</span>
                    {option.count != null && (
                      <Box as="span" color="gray.500" fontSize="sm">
                        {" "}
                        ({option.count})
                      </Box>
                    )}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
