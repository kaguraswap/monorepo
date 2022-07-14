import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";

import { Nft } from "../../../../../../common/dist/graphql";
import { validate } from "../../../../../../common/entities/nft";
import { NFTTemplate } from "../../../../components/templates/NFT";

export interface NFTPageProps {
  nft: Nft;
}

const NFT_QUERY = gql`
  query {
    nft(
      where: {
        chainId: { _eq: "1" }
        contractAddress: { _eq: "0x0000000000000000000000000000000000000001" }
        tokenId: { _eq: "0" }
      }
    ) {
      orders {
        id
        nft {
          chainId
          contractAddress
          tokenId
          metadata
        }
      }
      holder
      chainId
      contractAddress
      tokenId
      metadata
    }
  }
`;

const NFTPage: NextPage<NFTPageProps> = ({ nft }) => {
  const [syncedNFTState, setSyncedNFTState] = React.useState<any>(nft);
  const [syncedOrdersState, setSynceOrdersState] = React.useState<any>([]);
  const { data } = useQuery(NFT_QUERY);
  React.useEffect(() => {
    if (!data) {
      return;
    }
    const [nft] = data.nft;
    setSyncedNFTState({
      ...nft,
      ...data,
    });
    if (nft.orders.length > 0) {
      setSynceOrdersState(nft.orders);
    }
  }, [data]);
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
  return {
    props: {
      nft,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
