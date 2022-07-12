import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { getChainId } from "lib/web3/networks";
import router from "next/router";
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";

export const NFTRegister: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chainId, setChainId] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [assetURI, setAssetURI] = useState("");
  const [assetURIErrorMessage, setAssetURIErrorMessage] = useState("");

  const handleChainId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
    setChainId(id);
  };
  const handleContractAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setContractAddress(address);
  };

  const handleTokenId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
    setTokenId(id);
  };

  const handleAssetURIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setAssetURI(inputValue);
    const [tokenId, nftContractAddress, network] = inputValue.split("/").reverse();
    if (
      typeof tokenId !== "string" ||
      typeof nftContractAddress !== "string" ||
      !ethers.utils.isAddress(nftContractAddress) ||
      typeof network !== "string" ||
      getChainId(network) === 0
    ) {
      clear();
      setAssetURIErrorMessage("URI Invalid, please input chainId, contract address and token id directly");
      return;
    }
    setAssetURIErrorMessage("");
    setContractAddress(nftContractAddress);
    setTokenId(tokenId);
    setChainId(getChainId(network).toString());
  };

  const clear = () => {
    setAssetURI("");
    setContractAddress("");
    setTokenId("");
    setChainId("");
  };

  return (
    <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8", lg: "12" }} py={{ base: "6", md: "8", lg: "12" }}>
      <Button onClick={onOpen}>
        Add NFT <Icon as={IoIosAdd} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p="8">
          <ModalHeader>Add your NFT</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={assetURIErrorMessage !== ""} mb="4">
              <Input placeholder="OpenSea/TofuNFT URL" value={assetURI} onChange={handleAssetURIChange}></Input>
              <FormErrorMessage ml="4">{assetURIErrorMessage}</FormErrorMessage>
            </FormControl>
            <Flex alignItems="center" justify="space-between" my="4">
              <Text fontWeight="semibold">Chain ID</Text>
              <Input w="48" onChange={handleChainId} value={chainId}></Input>
            </Flex>
            <Flex alignItems="center" justify="space-between" my="2">
              <Text fontWeight="semibold">Contract Address</Text>
              <Input w="48" onChange={handleContractAddress} value={contractAddress}></Input>
            </Flex>
            <Flex alignItems="center" justify="space-between" my="4">
              <Text fontWeight="semibold">Token ID</Text>
              <Input w="48" onChange={handleTokenId} value={tokenId}></Input>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Stack width="full" direction={{ base: "column", lg: "row" }}>
              <Button
                colorScheme="blue"
                width="full"
                disabled={!chainId || !contractAddress || !tokenId}
                onClick={() => {
                  router.push(`/nfts/${chainId}/${contractAddress}/${tokenId}`);
                }}
              >
                Add
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
