import { doc, getFirestore } from "firebase/firestore";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { NFT } from "../../../../common/types/nft";
import { toKey } from "../../../../common/utils/nft";
import { getFirebaseApp } from "../../lib/firebase";

export const useNFT = (nft: NFT) => {
  const [nftState, setNFTState] = React.useState(nft);

  const app = getFirebaseApp();
  const key = toKey(nft);
  const [data] = useDocumentData(doc(getFirestore(app), "nfts", key));

  React.useEffect(() => {
    if (!data) {
      return;
    }
    setNFTState({
      ...nft,
      metadata: {
        name: data.name,
        description: data.description,
        image: data.image,
        animationUrl: data.animationUrl,
      },
    });
  }, [nft, data]);

  return { nftState };
};
