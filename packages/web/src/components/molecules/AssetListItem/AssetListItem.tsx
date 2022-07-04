import { Box, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

import { Asset } from "../../../../../common/types/asset";
import { Link } from "../../atoms/Link";

export interface AssetListItemProps {
  asset: Asset;
}

export const AssetListItem: React.FC<AssetListItemProps> = ({ asset }) => {
  return (
    <Box>
      <Text>{asset.chainId}</Text>
      <Text>{asset.contractAddress}</Text>
      <Text>{asset.tokenId}</Text>
      {asset.collection && <Text>{asset.collection.name}</Text>}
      <Text>{asset.name}</Text>
      <Text>{asset.description}</Text>
      <Text>{asset.image}</Text>
    </Box>
  );
};
