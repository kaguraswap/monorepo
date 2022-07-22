import React from "react";

export const usePath = (chainId: string, contractAddress: string, tokenId: string) => {
  const path = React.useMemo(() => {
    return `/assets/${chainId}/${contractAddress}/${tokenId}`;
  }, [chainId, contractAddress, tokenId]);
  return { path };
};
