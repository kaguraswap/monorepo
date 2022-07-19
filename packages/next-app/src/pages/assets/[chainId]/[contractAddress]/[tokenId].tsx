import axios from "axios";
import { AssetTemplate } from "components/templates/Asset";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";

import { AssetAttributes } from "../../../../../../common/dist/entity/init-models";
import { AssetFragment, useAssetSubscription } from "../../../../../../common/dist/graphql";

export type AssetPageProps = Pick<AssetAttributes, "chainId" | "contractAddress" | "tokenId">;

const AssetPage: NextPage<AssetPageProps> = ({ chainId, contractAddress, tokenId }) => {
  const [asset, setAssets] = React.useState<AssetFragment>();

  const { data } = useAssetSubscription({
    variables: {
      chainId: chainId,
      contractAddress: contractAddress,
      tokenId: tokenId,
    },
  });

  React.useEffect(() => {
    if (!data || data.assets.length === 0) {
      return;
    }
    const [asset] = data.assets;
    setAssets(asset);
  }, [data]);

  return <AssetTemplate asset={asset} />;
};

export default AssetPage;

export const getStaticProps: GetStaticProps = async (context) => {
  // TODO: update validate
  const asset = {
    chainId: context.params?.chainId,
    contractAddress: context.params?.contractAddress,
    tokenId: context.params?.tokenId,
  };
  axios.post("http://localhost:3000/api/asset/sync", asset);
  return {
    props: asset,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
