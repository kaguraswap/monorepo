import { Box, Button, Heading, HStack, Icon, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { FiClock, FiHeart } from "react-icons/fi";

import { Asset } from "../../../../../common/types/asset";
import { Link } from "../../atoms/Link";

export interface AssetDetailProps {
  asset: Asset;
}

export const AssetDetail: React.FC<AssetDetailProps> = ({ asset }) => {
  return (
    <Box>
      <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8", lg: "12" }} py={{ base: "6", md: "8", lg: "12" }}>
        <Stack direction={{ base: "column", lg: "row" }} spacing={{ base: "6", lg: "12", xl: "16" }}>
          <Image src={asset.image} alt={asset.name}></Image>
          <Stack spacing={{ base: "6", lg: "8" }} maxW={{ lg: "sm" }} justify="center">
            <Stack spacing={{ base: "3", md: "4" }}>
              <Stack spacing="3">
                <Text fontSize="sm" fontWeight="medium" color={useColorModeValue("gray.600", "gray.400")}>
                  {asset.chainId}
                </Text>
                <HStack alignSelf="baseline">
                  {/* <Rating defaultValue={4} size="sm" /> */}
                  <Link href="#">
                    <Text fontSize="sm" fontWeight="medium" color={useColorModeValue("gray.600", "gray.400")}>
                      {asset.collection && (
                        <Link href={`/collections/${asset.collection.chainId}/${asset.collection.contractAddress}`}>
                          {asset.collection.name}
                        </Link>
                      )}
                      {" #" + asset.tokenId}
                    </Text>
                  </Link>
                </HStack>
                <Heading size="lg" fontWeight="medium">
                  {asset.name}
                </Heading>
              </Stack>
              {/* <PriceTag price={229} currency="GBP" rootProps={{ fontSize: 'xl' }} /> */}
              <Text color={useColorModeValue("gray.600", "gray.400")}>{asset.description}</Text>
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
            <Button colorScheme="blue" size="lg">
              Add to cart
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
