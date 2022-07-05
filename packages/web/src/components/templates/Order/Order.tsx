import React from "react";

import { NFT } from "../../../../../common/types/nft";
import { NFTList } from "../../organisms/NFTList";
import { DefaultLayout } from "../../utils/layout";

export interface OrderTemplateProps {
  nfts: NFT[];
}

export const OrderTemplate: React.FC<OrderTemplateProps> = ({ nfts }) => {
  return (
    <DefaultLayout>
      <NFTList nfts={nfts} />
    </DefaultLayout>
  );
};
