import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";

import { Asset } from "../../../../../common/types/asset";
import { Link } from "../../atoms/Link";
import { AssetListItem } from "../../molecules/AssetListItem";

export interface AssetListProps {
  assets: Asset[];
}

export const AssetList: React.FC<AssetListProps> = ({ assets }) => {
  return (
    <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8", lg: "12" }} py={{ base: "6", md: "8", lg: "12" }}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={{ base: "8", lg: "10" }}>
        {assets.map((asset, i) => (
          <Link key={i} href={`/assets/${asset.chainId}/${asset.contractAddress}/${asset.tokenId}`}>
            <AssetListItem key={i} asset={asset} />
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};
