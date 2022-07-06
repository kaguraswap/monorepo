import { httpsCallable } from "firebase/functions";
import type { GetServerSideProps, NextPage } from "next";
import React from "react";

import { NFT } from "../../../../../../common/types/nft";
import { validate } from "../../../../../../common/utils/nft";
import { NFTTemplate } from "../../../../components/templates/NFT";
import { useSyncedNFTState } from "../../../../hooks/useSyncedNFTState";
import { functions } from "../../../../lib/firebase";

export interface NFTPageProps {
  nft: NFT;
}

const NFTPage: NextPage<NFTPageProps> = ({ nft }) => {
  const { syncedNFTState } = useSyncedNFTState(nft);
  return <NFTTemplate nft={syncedNFTState} />;
};

export default NFTPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const nft = validate(context.params);
  if (!nft) {
    return {
      notFound: true,
    };
  }
  httpsCallable(functions, "nft-sync")(nft);
  return {
    props: {
      nft,
    },
  };
};
