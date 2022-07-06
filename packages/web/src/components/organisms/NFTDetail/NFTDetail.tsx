import { Box, Button, Heading, HStack, Icon, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import React from "react";
import { FiClock, FiHeart } from "react-icons/fi";

import { NFT } from "../../../../../common/types/nft";
import { db } from "../../../lib/firebase";
import { createOrder, toHash } from "../../../lib/order";
import { Link } from "../../atoms/Link";

export interface NFTDetailProps {
  nft: NFT;
}

export const NFTDetail: React.FC<NFTDetailProps> = ({ nft }) => {
  const submitOrder = async () => {
    const order = createOrder();
    const hash = await toHash(order);
    await setDoc(doc(db, "orders", hash), order);
    console.log(hash);
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
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
