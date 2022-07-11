import { OrderList } from "components/organisms/OrderList";
import React from "react";

import { NFT } from "../../../../../common/entities/nft";
import { Order } from "../../../../../common/entities/order";
import { NFTDetail } from "../../organisms/NFTDetail";
import { DefaultLayout } from "../../utils/layout";

export interface NFTTemplateProps {
  nft: NFT;
  orders: Order[];
}

export const NFTTemplate: React.FC<NFTTemplateProps> = ({ nft, orders }) => {
  return (
    <DefaultLayout chainId={Number(nft.chainId)}>
      <NFTDetail nft={nft} orders={orders} />
      <OrderList orders={orders} />
    </DefaultLayout>
  );
};
