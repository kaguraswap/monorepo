import { doc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { NFT } from "../../../../../../common/types/nft";
import { toKey, validate } from "../../../../../../common/utils/nft";
import { NFTTemplate } from "../../../../components/templates/NFT";
import { db, functions } from "../../../../lib/firebase";

export interface NFTPageProps {
  nft: NFT;
}

const NFTPage: NextPage<NFTPageProps> = ({ nft }) => {
  const [syncedNFTState, setSyncedNFTState] = React.useState(nft);
  const key = toKey(nft);
  const [data] = useDocumentData(doc(db, "nfts", key));
  React.useEffect(() => {
    if (!data) {
      return;
    }
    setSyncedNFTState({
      ...nft,
      ...data,
    });
  }, [nft, data]);
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
