import { AspectRatio, Box, HStack, Image, Skeleton, Stack, Tag, Text } from "@chakra-ui/react";
import React from "react";

import { NFT } from "../../../../../common/types/nft";

export interface NFTListItemProps {
  nft: NFT;
}

export const NFTListItem: React.FC<NFTListItemProps> = ({ nft }) => {
  return (
    <Stack spacing="3">
      <Box position="relative" className="group">
        {nft.metadata && (
          <>
            <AspectRatio ratio={1}>
              <Image src={nft.metadata.image} alt={nft.metadata.name} draggable="false" fallback={<Skeleton />} />
            </AspectRatio>
            <HStack spacing="3" position="absolute" top="4" left="4">
              {/* TODO: change to chain name and color */}
              <Tag key={nft.chainId} bg={`${"purple"}.500`} color="white" fontWeight="semibold">
                {nft.chainId}
              </Tag>
            </HStack>
          </>
        )}
      </Box>
      {nft.collection && <Text>{nft.collection.name}</Text>}
      {nft.metadata && <Text fontWeight="semibold">{nft.metadata.name}</Text>}
    </Stack>
  );
};
