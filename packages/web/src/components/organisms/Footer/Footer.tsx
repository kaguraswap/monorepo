import { Box, Text } from "@chakra-ui/react";
import React from "react";

import { Link } from "../../atoms/Link";

export const Footer: React.FC = () => {
  return (
    <Box>
      <Text>
        <Link href="/">Footer</Link>
      </Text>
    </Box>
  );
};
