import { Box, Button, Heading, Text, useDisclosure, VStack } from "@chakra-ui/react";
import React from "react";

import { Modal } from "../../molecules/Modal";
import { Swap } from "../Swap";

export const Hero: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <VStack justify={"center"} py="32" spacing={"8"}>
        <VStack>
          <Heading fontWeight={"bold"} fontSize={"4xl"}>
            Kagura Swap
          </Heading>
          <Text fontSize={"sm"}>Multichain NFT Swap built with Seaport and 0x</Text>
        </VStack>
        <Button onClick={onOpen}>Create Swap</Button>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Swap />
      </Modal>
    </Box>
  );
};
