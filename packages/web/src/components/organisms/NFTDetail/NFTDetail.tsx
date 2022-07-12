import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
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
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useNetwork } from "@thirdweb-dev/react";
import { Link } from "components/atoms/Link";
import { ethers } from "ethers";
import { httpsCallable } from "firebase/functions";
import { ChainIDToIcon, KAGURA_SUPPORTED_CHAIN_ID } from "lib/rpc";
import router from "next/router";
import React, { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import BeatLoader from "react-spinners/BeatLoader";
import { useAccount, useSigner } from "wagmi";

import { BSP, FEE_RECIPIENT } from "../../../../../common/configs/app";
import { NFT } from "../../../../../common/entities/nft";
import { Order, OrderDirection } from "../../../../../common/entities/order";
import { shortenAddress } from "../../../../../common/utils/wallet";
import { KaguraSDK } from "../../../../../sdk/lib";
import { functions } from "../../../lib/firebase";
import { ConnectWalletButton } from "../../molecules/ConnectWalletButton";

export interface NFTDetailProps {
  nft: NFT;
  orders: Order[];
}

export const NFTDetail: React.FC<NFTDetailProps> = ({ nft, orders }) => {
  const [signer] = useSigner();
  const [account] = useAccount();
  const { isOpen: isCreateOrderOpen, onOpen: onCreateOrderOpen, onClose: onCreateOrderClose } = useDisclosure();
  const { isOpen: isMakeOfferOpen, onOpen: onMakeOfferOpen, onClose: onMakeOfferClose } = useDisclosure();
  const [amountString, setAmount] = useState("0");
  const [youGetAmount, setYouGetAmount] = useState("0");

  const fees = [{ recipient: FEE_RECIPIENT, basisPoints: BSP }];
  const [, switchNetwork] = useNetwork();

  const handleAmount = (amount: string) => {
    setAmount(amount);
    const fee = (Number(amount) * BSP) / 10000;
    setYouGetAmount((Number(amount) - fee).toFixed(5));
  };

  const validateModalOpen = async (chainId: string, open: () => void) => {
    if (!switchNetwork) return;
    const { error } = await switchNetwork(Number(chainId));
    if (!error) open();
  };

  const handleLowestOrder = () => {
    const sortedOrders = orders.sort((a, b) => Number(a.value) - Number(b.value));
    router.push(`/orders/${sortedOrders[0].id}`);
  };

  const handleHighestOrder = () => {
    const sortedOrders = orders.sort((a, b) => Number(b.value) - Number(a.value));
    router.push(`/orders/${sortedOrders[0].id}`);
  };

  const createSellOrBuyOrder = async (direction: OrderDirection) => {
    if (!signer.data || !account.data) {
      return;
    }
    const { address } = account.data;
    const provider = signer.data.provider as ethers.providers.JsonRpcProvider;
    const sdk = new KaguraSDK(provider);
    const amount = ethers.utils.parseEther(amountString);
    const { signedOrder } = await sdk.order.create(
      "seaport",
      direction,
      {
        contractAddress: nft.contractAddress,
        tokenId: nft.tokenId,
      },
      {
        amount: amount.toString(),
      },
      address,
      fees
    );
    const { data } = await httpsCallable(functions, "order-create")({ type: "seaport", nft, signedOrder });
    const result = data as Order;
    router.push(`/orders/${result.id}`);
  };

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
                <Icon
                  as={ChainIDToIcon[Number(nft.chainId) as KAGURA_SUPPORTED_CHAIN_ID]}
                  rounded="full"
                  width="8"
                  height="8"
                />
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
          {account.data ? (
            <>
              {account.data.address === nft.holder ? (
                <>
                  <Button
                    colorScheme="blue"
                    size="lg"
                    onClick={() => validateModalOpen(nft.chainId, onCreateOrderOpen)}
                  >
                    List for Sale
                  </Button>
                  <Button
                    colorScheme="blue"
                    size="lg"
                    disabled={!orders.some((order) => order.direction === "buy")}
                    onClick={handleHighestOrder}
                  >
                    Accept Highest Offer
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    colorScheme="blue"
                    size="lg"
                    disabled={!orders.some((order) => order.direction === "sell")}
                    onClick={handleLowestOrder}
                  >
                    Buy Now
                  </Button>
                  <Button colorScheme="blue" size="lg" onClick={() => validateModalOpen(nft.chainId, onMakeOfferOpen)}>
                    Make Offer
                  </Button>
                </>
              )}
            </>
          ) : (
            <ConnectWalletButton size="lg" />
          )}

          <Modal isOpen={isCreateOrderOpen} onClose={onCreateOrderClose}>
            <ModalOverlay />
            <ModalContent p="4">
              <ModalHeader>List Token for Sale</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex alignItems="center" justify="space-between" my="2">
                  <Text fontWeight="semibold">Price</Text>
                  <NumberInput step={0.01} min={0} onChange={(amount) => handleAmount(amount)}>
                    <NumberInputField placeholder="Amount" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
                <Flex alignItems="center" justify="space-between" my="4">
                  <Text fontWeight="semibold">Fees</Text>
                  <Text>2.5%</Text>
                </Flex>
                <Flex alignItems="center" justify="space-between" my="4">
                  <Text fontWeight="semibold">You get</Text>
                  <Text>{youGetAmount}</Text>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Stack width="full" direction={{ base: "column", lg: "row" }}>
                  <Button width="full" onClick={onCreateOrderClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue" width="full" onClick={() => createSellOrBuyOrder("sell")}>
                    List
                  </Button>
                </Stack>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal isOpen={isMakeOfferOpen} onClose={onMakeOfferClose}>
            <ModalOverlay />
            <ModalContent p="4">
              <ModalHeader>Make a Token Offer</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex alignItems="center" justify="space-between" my="2">
                  <Text fontWeight="semibold">Price (wETH)</Text>
                  <NumberInput step={0.01} min={0} onChange={(amount) => handleAmount(amount)}>
                    <NumberInputField placeholder="Amount" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
                <Flex alignItems="center" justify="space-between" my="4">
                  <Text fontWeight="semibold">Fees</Text>
                  <Text>2.5%</Text>
                </Flex>
                <Flex alignItems="center" justify="space-between" my="4">
                  <Text fontWeight="semibold">Total Cost</Text>
                  <Text>{youGetAmount}</Text>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Stack width="full" direction={{ base: "column", lg: "row" }}>
                  <Button width="full" onClick={onMakeOfferClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue" width="full" onClick={() => createSellOrBuyOrder("buy")}>
                    Make Offer
                  </Button>
                </Stack>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Box border="1px" borderColor="gray.200" borderRadius="md" p="6">
            <Heading size="md" mb="4">
              Token Info
            </Heading>
            <Flex alignItems="center" justify="space-between">
              <Text>Contract Address</Text>
              <Link href={``}>
                <HStack>
                  <Text color={"blue.500"}>{shortenAddress(nft.contractAddress)}</Text>
                  <Icon as={FiExternalLink} color="blue.500" />
                </HStack>
              </Link>
            </Flex>
            <Flex alignItems="center" justify="space-between">
              <Text>Token ID</Text>
              <Text>{nft.tokenId}</Text>
            </Flex>
            <Flex alignItems="center" justify="space-between">
              <Text>Token Standard</Text>
              {nft.supportsInterface?.isERC721 ? <Text>ERC721</Text> : <Text>undefined</Text>}
            </Flex>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
