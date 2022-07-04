import { Box, Text } from "@chakra-ui/react";
import React from "react";

import { Link } from "../../atoms/Link";
import { DropdownMyMenu } from "../../molecules/DropdownMyMenu";
import { DropdownSelectNetwork } from "../../molecules/DropdownSelectNetwork";
import { ModalConnectWallet } from "../../molecules/ModalConnectWallet";

export const Header: React.FC = () => {
  return (
    <Box>
      <Text>
        <Link href="/">Logo</Link>
      </Text>
      <DropdownMyMenu />
      <DropdownSelectNetwork />
      <ModalConnectWallet />
    </Box>
  );
};
