import { Box } from "@chakra-ui/react";
import React from "react";

import { Asset } from "../../../../../common/types/asset";
import { Link } from "../../atoms/Link";
import { AssetListItem } from "../../molecules/AssetListItem";

export interface AssetListProps {
  assets: Asset[];
}

export const AssetList: React.FC<AssetListProps> = ({ assets }) => {
  return (
    <Box>
      {assets.map((asset, i) => (
        <Link key={i} href={`/assets/${asset.chainId}/${asset.contractAddress}/${asset.tokenId}`}>
          <AssetListItem key={i} asset={asset} />
        </Link>
      ))}
    </Box>
  );
};
