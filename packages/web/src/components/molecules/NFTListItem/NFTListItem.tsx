import { Box, Text } from "@chakra-ui/react";
import React from "react";

import { NFT } from "../../../../../common/types/nft";

export interface NFTListItemProps {
  nft: NFT;
}

export const NFTListItem: React.FC<NFTListItemProps> = ({ nft }) => {
  return (
    <Box>
      <Text>{nft.chainId}</Text>
      <Text>{nft.contractAddress}</Text>
      <Text>{nft.tokenId}</Text>
      {nft.collection && <Text>{nft.collection.name}</Text>}
      <Text>{nft.metadata.name}</Text>
      <Text>{nft.metadata.description}</Text>
      <Text>{nft.metadata.image}</Text>
    </Box>
  );
};
