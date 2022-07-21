import axios from "axios";
import { AssetTemplate } from "components/templates/Asset";
import { AssetKey, validate } from "lib/ajv";
import { toHasuraCondition } from "lib/hasura";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";

import { AssetFragment, useAssetSubscription } from "../../../../../../hasura/dist/graphql";

export type AssetPageProps = AssetKey;

const AssetPage: NextPage<AssetPageProps> = ({ chainId, contractAddress, tokenId }) => {
  const [asset, setAssets] = React.useState<AssetFragment>();

  const { where } = React.useMemo(() => {
    return toHasuraCondition({ chainId, contractAddress, tokenId });
  }, [chainId, contractAddress, tokenId]);

  const { data } = useAssetSubscription({
    variables: {
      where,
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
  if (!validate.assetKey(context.params)) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  const asset = {
    chainId: context.params.chainId,
    contractAddress: context.params.contractAddress,
    tokenId: context.params.tokenId,
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
