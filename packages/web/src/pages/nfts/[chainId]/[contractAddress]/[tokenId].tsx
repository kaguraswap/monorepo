import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";

import { NFT, toKey, validate } from "../../../../../../common/entities/nft";
import { NFTTemplate } from "../../../../components/templates/NFT";
import { db, functions } from "../../../../lib/firebase";

export interface NFTPageProps {
  nft: NFT;
}

const NFTPage: NextPage<NFTPageProps> = ({ nft }) => {
  const [syncedNFTState, setSyncedNFTState] = React.useState(nft);
  const [syncedOrdersState, setSynceOrdersState] = React.useState([]);
  const key = toKey(nft);
  const [nftDoc] = useDocumentData(doc(db, "nfts", key));
  const [orderDocs] = useCollectionData(
    query(
      collection(db, "orders"),
      where("nft.chainId", "==", nft.chainId),
      where("nft.contractAddress", "==", nft.contractAddress),
      where("nft.tokenId", "==", nft.tokenId)
    )
  );
  React.useEffect(() => {
    if (!nftDoc) {
      return;
    }
    setSyncedNFTState({
      ...nft,
      ...nftDoc,
    });
    if (orderDocs) {
      console.log(orderDocs);
      setSynceOrdersState(orderDocs as any);
    }
  }, [nft, nftDoc, orderDocs]);
  return <NFTTemplate nft={syncedNFTState} orders={syncedOrdersState} />;
};

export default NFTPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const nft = validate(context.params);
  if (!nft) {
    return {
      notFound: true,
    };
  }
  httpsCallable(functions, "nft-sync")({ nft });
  const key = toKey(nft);
  const nftDoc = await getDoc(doc(db, "nfts", key));
  const nftDocData = nftDoc.data();
  return {
    props: {
      nft: nftDocData ? JSON.parse(JSON.stringify(nftDocData)) : nft,
    },
    revalidate: nftDocData ? 300 : 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
