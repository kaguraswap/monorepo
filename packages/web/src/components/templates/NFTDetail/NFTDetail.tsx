import React from "react";

import { NFT } from "../../../../../common/entities/nft";
import { Order } from "../../../../../common/entities/order";
import { NFTDetail } from "../../organisms/NFTDetail";
import { DefaultLayout } from "../../utils/layout";

export interface NFTDetailTemplateProps {
  nft: NFT;
  orders: Order[];
}

export const NFTDetailTemplate: React.FC<NFTDetailTemplateProps> = ({ nft, orders }) => {
  return (
    <DefaultLayout>
      <NFTDetail nft={nft} orders={orders} />
    </DefaultLayout>
  );
};
