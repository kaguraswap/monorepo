import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";

import { NFT, toKey } from "../../../../../common/entities/nft";
import { Link } from "../../atoms/Link";
import { NFTListItem } from "../../molecules/NFTListItem";

export interface NFTListProps {
  nfts: NFT[];
}

export const NFTList: React.FC<NFTListProps> = ({ nfts }) => {
  return (
    <Box width="full">
      <SimpleGrid columns={{ base: 2, md: 8 }} gap={{ base: "2", md: "2" }}>
        {nfts.map((nft) => (
          <Link key={toKey(nft)} href={`/nft/${nft.chainId}/${nft.contractAddress}/${nft.tokenId}`}>
            <NFTListItem nft={nft} />
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};
