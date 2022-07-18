import { NFTList } from "components/organisms/NFTList";
import React from "react";

import { NFT } from "../../../../../common/entities/nft";
import { Filters } from "../../organisms/Filters";
import { DefaultLayout } from "../../utils/layout";

export interface HomeTemplateProps {
  nfts: NFT[];
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({ nfts }) => {
  return (
    <DefaultLayout>
      <Filters>
        <NFTList nfts={nfts} />
      </Filters>
    </DefaultLayout>
  );
};
