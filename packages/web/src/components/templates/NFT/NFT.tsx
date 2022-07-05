import React from "react";

import { NFT } from "../../../../../common/types/nft";
import { NFTDetail } from "../../organisms/NFTDetail";
import { DefaultLayout } from "../../utils/layout";

export interface NFTTemplateProps {
  nft: NFT;
}

export const NFTTemplate: React.FC<NFTTemplateProps> = ({ nft }) => {
  return (
    <DefaultLayout>
      <NFTDetail nft={nft} />
    </DefaultLayout>
  );
};
