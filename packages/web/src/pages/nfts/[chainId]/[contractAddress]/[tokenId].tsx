import axios from "axios";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";

import { validate } from "../../../../../../common/entities/nft";
import { Nft, useNftQuery } from "../../../../../../common/generated/graphql";
import { NFTTemplate } from "../../../../components/templates/NFT";

export interface NFTPageProps {
  nft: Nft;
}

const NFTPage: NextPage<NFTPageProps> = ({ nft }) => {
  const [syncedNFTState, setSyncedNFTState] = React.useState<any>(nft);
  const [syncedOrdersState, setSynceOrdersState] = React.useState<any>([]);

  const { data } = useNftQuery({
    variables: {
      chainId: nft.chainId as string,
      contractAddress: nft.contractAddress,
      tokenId: nft.tokenId,
    },
  });

  React.useEffect(() => {
    if (!data) {
      return;
    }
    const [nft] = data.nft;
    setSyncedNFTState({
      ...nft,
      ...data,
    });
    if (nft.orders && nft.orders.length > 0) {
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

  axios.post("http://localhost:3000/api/nft/sync", { nft });

  return {
    props: {
      nft: {
        ...nft,
        contractAddress: nft.contractAddress.toLowerCase(),
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
