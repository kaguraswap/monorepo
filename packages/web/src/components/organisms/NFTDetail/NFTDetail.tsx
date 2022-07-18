import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "components/atoms/Link";
import { ethers } from "ethers";
import router from "next/router";
import React, { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import BeatLoader from "react-spinners/BeatLoader";
import { useAccount, useSigner } from "wagmi";

import { BSP, DEFAULT_PRICE, DEFAULT_TIP, TIP_RECIPIENT } from "../../../../../common/configs/app";
import networks from "../../../../../common/configs/networks.json";
import protocols from "../../../../../common/configs/protocols.json";
import { ChainId } from "../../../../../common/entities/network";
import { NFT } from "../../../../../common/entities/nft";
import { Order, OrderDirection, OrderType } from "../../../../../common/entities/order";
import { shortenAddress } from "../../../../../common/utils/wallet";
import ERC721Artifact from "../../../../../sdk/artifacts/@openzeppelin/contracts/token/ERC721/ERC721.sol/ERC721.json";
import { KaguraSDK } from "../../../../../sdk/lib";
import { ERC721 } from "../../../../../sdk/typechain";
import { useInput } from "../../../hooks/useInput";
import { useIsWagmiConnected } from "../../../hooks/useIsWagmiConnected";
import { useSwap } from "../../../hooks/useSwap";
import { ConnectWallet } from "../../molecules/ConnectWallet";

export interface NFTDetailProps {
  nft: NFT;
  orders: Order[];
}

export const NFTDetail: React.FC<NFTDetailProps> = ({ nft, orders }) => {
  const { value: inputPrice, handleInput: handleInputPrice } = useInput(DEFAULT_PRICE);
  const { value: selectedProtocol, handleInput: handleSelectedProtocol } = useInput<OrderType>("seaport");
  const { value: inputTip, handleInput: handleInputTip } = useInput(DEFAULT_TIP);

  return (
    <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8", lg: "12" }} py={{ base: "6", md: "8", lg: "12" }}>
      <Stack direction={{ base: "column", lg: "row" }} spacing={{ base: "6", lg: "12", xl: "16" }}>
        {nft.metadata?.image ? (
          <Image src={nft.metadata.image} alt={nft.metadata.name} width={"xl"} />
        ) : (
          <Image src="/image_placeholder.png" alt="placeholder" width={"xl"} />
        )}
        <Stack spacing={{ base: "6", lg: "8" }} maxW={{ lg: "sm" }} justify="center">
          <Stack spacing={{ base: "3", md: "4" }}>
            <Stack spacing="3">
              <Text fontSize="sm" fontWeight="medium" color={useColorModeValue("gray.600", "gray.400")}>
                {/* <Icon
                  as={ChainIDToIcon[Number(nft.chainId) as KAGURA_SUPPORTED_CHAIN_ID]}
                  rounded="full"
                  width="8"
                  height="8"
                /> */}
              </Text>
              {nft.metadata ? (
                <>
                  {nft.metadata.name ? (
                    <Heading size="lg" fontWeight="medium">
                      {nft.metadata.name}
                    </Heading>
                  ) : (
                    <Heading size="lg" fontWeight="medium">
                      # {nft.tokenId}
                    </Heading>
                  )}
                </>
              ) : (
                <BeatLoader size={16} />
              )}
            </Stack>
            <Text color={useColorModeValue("gray.600", "gray.400")}>
              {nft.metadata ? nft.metadata.description : ""}
            </Text>
          </Stack>
          <Box>
            <VStack spacing={1} mb="8">
              <FormControl>
                <Text>Price</Text>
                <NumberInput step={0.01} min={0} defaultValue={DEFAULT_PRICE} onChange={handleInputPrice}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <Text>Tip</Text>
                <NumberInput step={0.5} min={0} max={100} defaultValue={DEFAULT_TIP} onChange={handleInputTip}>
                  <NumberInputField placeholder="Amount" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <Text>Swap Protocol</Text>
                <Select onChange={handleSelectedProtocol} value={selectedProtocol}>
                  {networks[nft.chainId].protocols.map((protocol) => (
                    <option key={protocol} value={protocol}>
                      {protocols[protocol as OrderType].name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </VStack>
            <HStack>
              <Button width="100%">Confirm</Button>
            </HStack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
