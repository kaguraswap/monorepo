import { ethers } from "ethers";
import { collection as firestoreCollection, query, where } from "firebase/firestore";
import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { Collection } from "../../../../../../common/types/collection";
import { CollectionTemplate } from "../../../../components/templates/Collection";
import { db } from "../../../../lib/firebase";

export interface AccountPageProps {
  collection: Collection;
}

const CollectionPage: NextPage<AccountPageProps> = ({ collection }) => {
  const [syncedCollectionState, setSyncedCollectionState] = React.useState(collection);
  const [data] = useCollectionData(
    query(
      firestoreCollection(db, "nfts"),
      where("chainId", "==", collection.chainId),
      where("contractAddress", "==", collection.contractAddress)
    )
  );
  React.useEffect(() => {
    if (!data) {
      return;
    }
    setSyncedCollectionState({ ...collection, nfts: data as any });
  }, [collection, data]);

  return <CollectionTemplate collection={syncedCollectionState} />;
};

export default CollectionPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (
    !context.params ||
    typeof context.params.chainId !== "string" ||
    typeof context.params.contractAddress !== "string" ||
    !ethers.utils.isAddress(context.params.contractAddress)
  ) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      collection: {
        chainId: context.params.chainId,
        contractAddress: context.params.contractAddress,
      },
    },
  };
};
