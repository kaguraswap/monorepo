import React from "react";

import { NFT } from "../../../../../common/entities/nft";
import { NFTList } from "../../organisms/NFTList";
import { NFTRegister } from "../../organisms/NFTRegister";
import { DefaultLayout } from "../../utils/layout";

export interface AccountTemplateProps {
  nfts: NFT[];
}

export const AccountTemplate: React.FC<AccountTemplateProps> = ({ nfts }) => {
  return (
    <DefaultLayout>
      <NFTRegister />
      <NFTList nfts={nfts} />
    </DefaultLayout>
  );
};
