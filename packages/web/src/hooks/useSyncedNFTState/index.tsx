import { doc } from "firebase/firestore";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { NFT } from "../../../../common/types/nft";
import { toKey } from "../../../../common/utils/nft";
import { db } from "../../lib/firebase";

export const useSyncedNFTState = (nft: NFT) => {
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

  return { syncedNFTState };
};
