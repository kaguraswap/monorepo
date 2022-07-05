import { Box } from "@chakra-ui/react";
import React from "react";

import { NFT } from "../../../../../common/types/nft";
import { Link } from "../../atoms/Link";
import { NFTListItem } from "../../molecules/NFTListItem";

export interface NFTListProps {
  nfts: NFT[];
}

export const NFTList: React.FC<NFTListProps> = ({ nfts }) => {
  return (
    <Box>
      {nfts.map((nft, i) => (
        <Link key={i} href={`/nfts/${nft.chainId}/${nft.contractAddress}/${nft.tokenId}`}>
          <NFTListItem key={i} nft={nft} />
        </Link>
      ))}
    </Box>
  );
};
