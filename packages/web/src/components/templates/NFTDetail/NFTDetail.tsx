import React from "react";

import { Nft } from "../../../../../common/dist/graphql";
import { NFTDetail } from "../../organisms/NFTDetail";
import { DefaultLayout } from "../../utils/layout";

export interface NFTDetailTemplateProps {
  nft: Nft;
}

export const NFTDetailTemplate: React.FC<NFTDetailTemplateProps> = ({ nft }) => {
  return (
    <DefaultLayout>
      <NFTDetail nft={nft} />
    </DefaultLayout>
  );
};
