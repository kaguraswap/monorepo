import { AspectRatio, Box, HStack, Image, Skeleton, Stack, Tag, Text } from "@chakra-ui/react";
import React from "react";

import { Asset } from "../../../../../common/types/asset";

export interface AssetListItemProps {
  asset: Asset;
}

export const AssetListItem: React.FC<AssetListItemProps> = ({ asset }) => {
  return (
    <Stack spacing="3">
      <Box position="relative" className="group">
        <AspectRatio ratio={1}>
          <Image src={asset.image} alt={asset.name} draggable="false" fallback={<Skeleton />} />
        </AspectRatio>
        <HStack spacing="3" position="absolute" top="4" left="4">
          {/* TODO: change to chain name and color */}
          <Tag key={asset.chainId} bg={`${"purple"}.500`} color="white" fontWeight="semibold">
            {asset.chainId}
          </Tag>
        </HStack>
      </Box>
      {asset.collection && <Text>{asset.collection.name}</Text>}
      <Text fontWeight="semibold">{asset.name}</Text>
    </Stack>
  );
};
