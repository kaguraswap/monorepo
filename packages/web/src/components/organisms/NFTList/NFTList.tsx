import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";

import { NFT } from "../../../../../common/types/nft";
import { Link } from "../../atoms/Link";
import { NFTListItem } from "../../molecules/NFTListItem";

export interface NFTListProps {
  nfts: NFT[];
}

export const NFTList: React.FC<NFTListProps> = ({ nfts }) => {
  return (
    <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8", lg: "12" }} py={{ base: "6", md: "8", lg: "12" }}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={{ base: "8", lg: "10" }}>
        {nfts.map((nft, i) => (
          <Link key={i} href={`/nfts/${nft.chainId}/${nft.contractAddress}/${nft.tokenId}`}>
            <NFTListItem key={i} nft={nft} />
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};
