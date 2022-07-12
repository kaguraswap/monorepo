import { ethers } from "ethers";
import { collection, query, where } from "firebase/firestore";
import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { NFT } from "../../../../../common/entities/nft";
import { AccountTemplate } from "../../../components/templates/Account";
import { db } from "../../../lib/firebase";

export interface AccountPageProps {
  walletAddress: string;
}

const AccountPage: NextPage<AccountPageProps> = ({ walletAddress }) => {
  const [syncedNFTsState, setSyncedNFTsState] = React.useState<NFT[]>([]);
  const [nftDocs] = useCollectionData(query(collection(db, "nfts"), where("holder", "==", walletAddress)));
  React.useEffect(() => {
    if (!nftDocs) {
      return;
    }
    setSyncedNFTsState(nftDocs as NFT[]);
  }, [nftDocs]);

  return <AccountTemplate nfts={syncedNFTsState} />;
};

export default AccountPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (
    !context.params ||
    typeof context.params.walletAddress !== "string" ||
    !ethers.utils.isAddress(context.params.walletAddress)
  ) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      walletAddress: context.params.walletAddress,
    },
  };
};
