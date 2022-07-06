import { ethers } from "ethers";
import type { GetServerSideProps, NextPage } from "next";
import React from "react";

import { isChainId } from "../../../../../../common/types/chainId";
import { NFT } from "../../../../../../common/types/nft";
import { NFTTemplate } from "../../../../components/templates/NFT";
import { useNFT } from "../../../../hooks/useNFT";

export interface NFTPageProps {
  nft: NFT;
}

const NFTPage: NextPage<NFTPageProps> = ({ nft }) => {
  const { nftState } = useNFT(nft);
  return <NFTTemplate nft={nftState} />;
};

export default NFTPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (
    !context.params ||
    typeof context.params.chainId !== "string" ||
    typeof context.params.contractAddress !== "string" ||
    typeof context.params.tokenId !== "string" ||
    !isChainId(context.params.chainId) ||
    !ethers.utils.isAddress(context.params.contractAddress)
  ) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      nft: {
        chainId: context.params.chainId,
        contractAddress: context.params.contractAddress,
        tokenId: context.params.tokenId,
      },
    },
  };
};
