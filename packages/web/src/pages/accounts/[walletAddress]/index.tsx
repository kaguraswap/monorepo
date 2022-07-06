import { ethers } from "ethers";
import { collection, query, where } from "firebase/firestore";
import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { AccountTemplate } from "../../../components/templates/Account";
import { db } from "../../../lib/firebase";

export interface AccountPageProps {
  walletAddress: string;
}

const AccountPage: NextPage<AccountPageProps> = ({ walletAddress }) => {
  const [syncedNFTsState, setSyncedNFTsState] = React.useState([]);
  const [data] = useCollectionData(query(collection(db, "nfts"), where("holder", "==", walletAddress)));
  React.useEffect(() => {
    if (!data) {
      return;
    }
    setSyncedNFTsState(data as any);
  }, [data]);

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
