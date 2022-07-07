import { Box, ButtonGroup, Divider, IconButton, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <Box>
      <Divider />
      <Stack p="4" justify="space-between" direction={{ base: "column-reverse", md: "row" }} align="center">
        <Text fontSize="xs" color="gray.800">
          &copy; {new Date().getFullYear()} KaguraSwap
        </Text>
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="http://github.com/kaguraswap/monorepo"
            target="_blank"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="https://discord.gg/tQnCDXUgP2"
            target="_blank"
            aria-label="Discord"
            icon={<FaDiscord fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="http://twitter.com/kaguraswap"
            target="_blank"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          />
        </ButtonGroup>
      </Stack>
    </Box>
  );
};
