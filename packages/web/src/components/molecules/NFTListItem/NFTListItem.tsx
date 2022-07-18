import { AspectRatio, Box, HStack, Image, Skeleton, Stack, Tag, Text, VStack } from "@chakra-ui/react";
import React from "react";

import networks from "../../../../../common/configs/networks.json";
import { NFT } from "../../../../../common/entities/nft";

export interface NFTListItemProps {
  nft: NFT;
}

export const NFTListItem: React.FC<NFTListItemProps> = ({ nft }) => {
  return (
    <Stack border="1px" rounded="xl" borderColor="gray.200">
      <Box position="relative" className="group">
        {nft.metadata && (
          <AspectRatio ratio={1}>
            <Image
              src={nft.metadata.image}
              alt={nft.metadata.name}
              fallback={<Skeleton />}
              rounded="xl"
              roundedBottom={"none"}
            />
          </AspectRatio>
        )}
        <Tag position="absolute" top="2" left="2">
          {networks[nft.chainId].name}
        </Tag>
        {/* TODO: Price */}
        <Tag position="absolute" bottom="2" right="2">
          Price
        </Tag>
      </Box>
      {nft.metadata && (
        <Box px="2" pb="2">
          <Text fontSize={"xs"}>{nft.metadata.name}</Text>
          {/* TODO: Collection */}
          <Text fontSize={"xs"}>Collection</Text>
        </Box>
      )}
    </Stack>
  );
};
