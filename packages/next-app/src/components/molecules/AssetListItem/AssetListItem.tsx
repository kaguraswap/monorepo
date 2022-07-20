import { AspectRatio, Box, Image, Skeleton, Tag, Text } from "@chakra-ui/react";
import React from "react";

import { Assets } from "../../../../../hasura/dist/graphql";
import { AssetMetadata } from "../../../../../hasura/src/types/asset-metadata";

export interface AssetListItemProps extends Pick<Assets, "tokenId">, Pick<AssetMetadata, "name" | "image"> {
  network: string;
  price?: string;
}

export const AssetListItem: React.FC<AssetListItemProps> = ({ network, tokenId, image, name, price }) => {
  // TODO: better design
  return (
    <Box border="1px" rounded="xl" borderColor="gray.200" width="100%">
      <Box position="relative" className="group">
        <AspectRatio ratio={1}>
          <Image src={image} alt={name} fallback={<Skeleton />} rounded="xl" roundedBottom={"none"} />
        </AspectRatio>
        <Tag position="absolute" top="2" left="2" fontSize={"xs"}>
          {network}
        </Tag>
        <Tag position="absolute" top="2" right="2" fontSize={"xs"}>
          # {tokenId}
        </Tag>
        {price && (
          <Tag position="absolute" bottom="2" right="2" fontSize={"xs"}>
            {price}
          </Tag>
        )}
      </Box>
      <Box px="2" p="2">
        <Text fontSize={"xs"}>{name}</Text>
        {/* TODO: Collection */}
        <Text fontSize={"xs"}>Collection</Text>
      </Box>
    </Box>
  );
};
