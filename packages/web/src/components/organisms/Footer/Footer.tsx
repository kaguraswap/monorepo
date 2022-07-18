import { Box, ButtonGroup, IconButton, Stack, Text } from "@chakra-ui/react";
import React from "react";

import { icons } from "./data";

export const Footer: React.FC = () => {
  return (
    <Box>
      <Stack p="4" justify="space-between" direction={{ base: "column-reverse", md: "row" }} align="center">
        <Text>&copy; {new Date().getFullYear()} KaguraSwap</Text>
        <ButtonGroup variant={"ghost"}>
          {icons.map((icon) => (
            <IconButton key={icon.key} as="a" href={icon.href} target="_blank" aria-label={icon.key} icon={icon.icon} />
          ))}
        </ButtonGroup>
      </Stack>
    </Box>
  );
};
