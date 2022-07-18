import { AspectRatio, Box, Image, Skeleton, Tag, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useIsNFTOrderAvailable } from "hooks/useNFTOrderAvailable";
import React from "react";

import networks from "../../../../../common/configs/networks.json";
import { Nft } from "../../../../../common/dist/graphql";
import { ChainId } from "../../../../../common/entities/network";

export interface NFTListItemProps {
  nft: Nft;
}

export const NFTListItem: React.FC<NFTListItemProps> = ({ nft }) => {
  const { isNFTOrderAvailable } = useIsNFTOrderAvailable(nft);

  // TODO: better design
  return (
    <Box border="1px" rounded="xl" borderColor="gray.200" width="100%">
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
        <Tag position="absolute" top="2" left="2" fontSize={"xs"}>
          {networks[nft.chainId as ChainId].name}
        </Tag>
        <Tag position="absolute" top="2" right="2" fontSize={"xs"}>
          # {nft.tokenId}
        </Tag>
        {isNFTOrderAvailable && (
          <Tag position="absolute" bottom="2" right="2" fontSize={"xs"}>
            {`${ethers.utils.formatUnits(nft.orders[0].price)} ${networks[nft.chainId as ChainId].symbol}`}
          </Tag>
        )}
      </Box>
      {nft.metadata && (
        <Box px="2" p="2">
          <Text fontSize={"xs"}>{nft.metadata.name}</Text>
          {/* TODO: Collection */}
          <Text fontSize={"xs"}>Collection</Text>
        </Box>
      )}
    </Box>
  );
};
