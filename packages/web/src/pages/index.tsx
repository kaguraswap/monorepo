import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import type { NextPage } from "next";
import React from "react";

import { HomeTemplate, HomeTemplateProps } from "../components/templates/Home";

const HomePage: NextPage<HomeTemplateProps> = () => {
  const [syncedNFTsState, setSynceNFTsState] = React.useState<any>([]);

  const NFT_QUERY = gql`
    query {
      nft(where: { orders: { isValid: { _eq: true } } }) {
        chainId
        contractAddress
        tokenId
        metadata
      }
    }
  `;

  const { data } = useQuery(NFT_QUERY);

  React.useEffect(() => {
    if (!data) {
      return;
    }
    setSynceNFTsState(data.nft);
  }, [data]);

  return <HomeTemplate nfts={syncedNFTsState} />;
};

export default HomePage;
