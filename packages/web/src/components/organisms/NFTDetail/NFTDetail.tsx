import { Box, Button, Heading, HStack, Icon, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { Seaport } from "@opensea/seaport-js";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { ethers } from "ethers";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { FiClock, FiHeart } from "react-icons/fi";
import { useAccount, useSigner } from "wagmi";

import { NFT } from "../../../../../common/types/nft";
import { Order } from "../../../../../common/types/order";
import { db } from "../../../lib/firebase";
import { createOrder, toHash } from "../../../lib/order";
import { Link } from "../../atoms/Link";

export interface NFTDetailProps {
  nft: NFT;
  orders: Order[];
}

export const NFTDetail: React.FC<NFTDetailProps> = ({ nft, orders }) => {
  const [signer] = useSigner();
  const [account] = useAccount();

  const submitOrder = async () => {
    if (!signer.data || !account.data) {
      return;
    }
    const { address } = account.data;
    const provider = signer.data.provider as ethers.providers.JsonRpcProvider;
    const amount = "10000";
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
            amount,
            recipient: address,
          },
        ],
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
                <HStack alignSelf="baseline">
                  {/* <Rating defaultValue={4} size="sm" /> */}

                  <Text fontSize="sm" fontWeight="medium" color={useColorModeValue("gray.600", "gray.400")}>
                    {nft.collection && (
                      <Link href={`/collections/${nft.collection.chainId}/${nft.collection.contractAddress}`}>
                        {nft.collection.name}
                      </Link>
                    )}
                    {" #" + nft.tokenId}
                  </Text>
                </HStack>
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
            <Stack direction={{ base: "column", md: "row" }} spacing={{ base: "6", md: "8" }}>
              <Stack flex="1">
                <HStack spacing="1" color={useColorModeValue("gray.600", "gray.400")}>
                  <Icon as={FiClock} />
                  <Text fontSize="xs" fontWeight="medium">
                    Low stock
                  </Text>
                </HStack>
              </Stack>
            </Stack>
            <HStack spacing={{ base: "4", md: "8" }} align="flex-end" justify="space-evenly">
              <Box flex="1">
                <Button
                  variant="outline"
                  size="lg"
                  fontSize="md"
                  width="full"
                  leftIcon={<Icon as={FiHeart} boxSize="4" />}
                >
                  Favorite
                </Button>
              </Box>
            </HStack>
            <Button colorScheme="blue" size="lg" onClick={submitOrder}>
              Create Order
            </Button>
            <Button colorScheme="blue" size="lg" onClick={fulfillOrder}>
              Fulfiill Order
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
