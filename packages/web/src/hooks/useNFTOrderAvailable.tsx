import React from "react";

import { Nft } from "../../../common/dist/graphql";

export const useIsNFTOrderAvailable = (nft: Nft) => {
  const isNFTOrderAvailable = React.useMemo(() => {
    return nft.orders && nft.orders.length > 0;
  }, [nft]);
  return { isNFTOrderAvailable };
};
