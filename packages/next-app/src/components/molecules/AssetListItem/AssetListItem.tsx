import { AspectRatio, Box, Image, Skeleton, Tag, Text } from "@chakra-ui/react";
import { userModeState } from "lib/recoil/mode";
import React from "react";
import { useRecoilValue } from "recoil";

export interface AssetListItemProps {
  network: string;
  contractAddress: string;
  tokenId: string;
  name: string;
  image: string;
  price?: string;
}

export const AssetListItem: React.FC<AssetListItemProps> = ({
  network,
  contractAddress,
  tokenId,
  image,
  name,
  price,
}) => {
  const { isNoAssetMetadataMode } = useRecoilValue(userModeState);

  // TODO: better design
  return (
    <Box border="1px" rounded="xl" borderColor="gray.200" width="100%">
      {isNoAssetMetadataMode ? (
        <>
          <Text fontSize={"xs"}>{network}</Text>
          <Text fontSize={"xs"}>{contractAddress}</Text>
          <Text fontSize={"xs"}>{tokenId}</Text>
        </>
      ) : (
        <>
          {" "}
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
        </>
      )}
    </Box>
  );
};
