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
import { Seaport } from "@opensea/seaport-js";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { Link } from "components/atoms/Link";
import { ethers } from "ethers";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { useAccount, useSigner } from "wagmi";

import { BSP, FEE_RECIPIENT } from "../../../../../common/configs/app";
import { NFT } from "../../../../../common/types/nft";
import { Order } from "../../../../../common/types/order";
import { db } from "../../../lib/firebase";
import { createOrder, toHash } from "../../../lib/order";
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
  const [youGetAmount, setYouGetAmount] = useState(0);

  const fees = [{ recipient: FEE_RECIPIENT, basisPoints: BSP }];

  const shortenAddress = (str: string) => {
    return `${str.substring(0, 6)}...${str.substring(str.length - 4)}`;
  };

  const handleAmount = (amount: string) => {
    setAmount(amount);
    const fee = (Number(amount) * BSP) / 10000;
    setYouGetAmount(Number(amount) - fee);
  };

  const sell = async () => {
    if (!signer.data || !account.data) {
      return;
    }
    const { address } = account.data;
    const provider = signer.data.provider as ethers.providers.JsonRpcProvider;
    const amount = ethers.utils.parseEther(amountString);
    const seaport = new Seaport(provider);
    const { executeAllActions: executeAllOfferActions } = await seaport.createOrder(
      {
        offer: [
          {
            itemType: ItemType.ERC721,
            token: nft.contractAddress,
            identifier: nft.tokenId,
          },
        ],
        consideration: [
          {
            amount: amount.toString(),
            recipient: address,
          },
        ],
        fees,
      },
      address
    );
    const seaportOrder = await executeAllOfferActions();
    const order = createOrder(nft.chainId, nft.contractAddress, nft.tokenId);
    order.raw = seaportOrder;
    const hash = await toHash(order);
    await setDoc(doc(db, "orders", hash), order);
    console.log(hash);
  };

  const cancelOrder = async () => {
    if (!signer.data || !account.data) {
      return;
    }
    const [order] = orders;
    const { address } = account.data;
    const provider = signer.data.provider as ethers.providers.JsonRpcProvider;
    const seaport = new Seaport(provider);
    const cancel = await seaport.cancelOrders([{ offerer: address, ...order.raw.parameters }], address);
    await cancel.transact();
  };

  const fulfillOrder = async () => {
    if (!signer.data || !account.data) {
      return;
    }
    const [order] = orders;

    const { address } = account.data;
    const provider = signer.data.provider as ethers.providers.JsonRpcProvider;
    const seaport = new Seaport(provider);
    const { executeAllActions: executeAllFulfillActions } = await seaport.fulfillOrders({
      fulfillOrderDetails: [{ order: order.raw }],
      accountAddress: address,
    });
    await executeAllFulfillActions();
  };

  return (
    <Box>
      <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8", lg: "12" }} py={{ base: "6", md: "8", lg: "12" }}>
        <Stack direction={{ base: "column", lg: "row" }} spacing={{ base: "6", lg: "12", xl: "16" }}>
          {nft.metadata && <Image src={nft.metadata.image} alt={nft.metadata.name} width={"xl"}></Image>}
          <Stack spacing={{ base: "6", lg: "8" }} maxW={{ lg: "sm" }} justify="center">
            <Stack spacing={{ base: "3", md: "4" }}>
              <Stack spacing="3">
                <Text fontSize="sm" fontWeight="medium" color={useColorModeValue("gray.600", "gray.400")}>
                  {nft.chainId}
                </Text>
                {nft.metadata && (
                  <Heading size="lg" fontWeight="medium">
                    {nft.metadata.name}
                  </Heading>
                )}
              </Stack>
              <Text color={useColorModeValue("gray.600", "gray.400")}>
                {nft.metadata ? nft.metadata.description : ""}
              </Text>
            </Stack>
            {account.data ? (
              <Button colorScheme="blue" size="lg" onClick={onCreateOrderOpen}>
                Create Order
              </Button>
            ) : (
              <ConnectWalletButton size="lg" />
            )}
            <Button colorScheme="blue" size="lg" onClick={cancelOrder}>
              Cancel
            </Button>
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
                    <Text>0%</Text>
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
                    <Button colorScheme="blue" width="full" onClick={sell}>
                      List
                    </Button>
                  </Stack>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Button colorScheme="blue" size="lg" onClick={fulfillOrder}>
              Fulfill Order
            </Button>
            {account.data ? (
              <Button colorScheme="blue" size="lg" onClick={onMakeOfferOpen}>
                Make Offer
              </Button>
            ) : (
              <ConnectWalletButton size="lg" />
            )}
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
                    <Button colorScheme="blue" width="full" onClick={sell}>
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
    </Box>
  );
};
