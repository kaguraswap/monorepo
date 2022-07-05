import React from "react";

import { NFT } from "../../../../../common/types/nft";
import { NFTList } from "../../organisms/NFTList";
import { DefaultLayout } from "../../utils/layout";

export interface AccountTemplateProps {
  nfts: NFT[];
}

export const AccountTemplate: React.FC<AccountTemplateProps> = ({ nfts }) => {
  return (
    <DefaultLayout>
      <NFTList nfts={nfts} />
    </DefaultLayout>
  );
};
