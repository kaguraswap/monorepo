import { Box, Text } from "@chakra-ui/react";
import React from "react";

import { Asset } from "../../../../../common/types/asset";
import { Link } from "../../atoms/Link";

export interface AssetDetailProps {
  asset: Asset;
}

export const AssetDetail: React.FC<AssetDetailProps> = ({ asset }) => {
  return (
    <Box>
      <Text>{asset.chainId}</Text>
      <Text>{asset.contractAddress}</Text>
      <Text>{asset.tokenId}</Text>
      {asset.collection && (
        <Box>
          <Text>
            <Link href={`/collections/${asset.collection.chainId}/${asset.collection.contractAddress}`}>
              {asset.collection.name}
            </Link>
          </Text>
        </Box>
      )}
      <Text>{asset.name}</Text>
      <Text>{asset.description}</Text>
      <Text>{asset.image}</Text>
    </Box>
  );
};
