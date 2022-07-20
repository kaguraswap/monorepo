import axios from "axios";
import { AssetTemplate } from "components/templates/Asset";
import { ajv, assetSchema } from "lib/ajv";
import { toHasuraCondition } from "lib/hasura";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";

import { AssetAttributes } from "../../../../../../shared/dist/entity/init-models";
import { AssetFragment, useAssetSubscription } from "../../../../../../shared/dist/graphql";
import { ChainId } from "../../../../../../shared/src/types/network";
import { INVALID_ARGUMENT } from "../../../../../../shared/src/utils/error";

// TODO: error handling
const assetPagePropsSchema = {
  type: "object",
  properties: {
    ...assetSchema.properties,
  },
  required: assetSchema.required,
  additionalProperties: false,
};

export interface AssetPageProps extends Pick<AssetAttributes, "contractAddress" | "tokenId"> {
  chainId: ChainId;
}

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
  const validate = ajv.compile<AssetPageProps>(assetPagePropsSchema);
  if (!validate(context.params)) {
    throw new Error(INVALID_ARGUMENT);
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
