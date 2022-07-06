import { Box, Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import React from "react";

export const ModalConnectWallet: React.FC = () => {
  const connect = async () => {
    console.log("connect");
  };

  return (
    <Box>
      <Button onClick={connect} size="md">
        Connect Wallet
      </Button>
    </Box>
  );
};
