import { AssetTemplate } from "components/templates/Asset";
import { validate } from "lib/ajv";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { Mode } from "types/ui";

import { AssetFragment, useAssetQuery } from "../../../../../../../hasura/dist/graphql";
import { toHasuraCondition } from "../../../../../../../hasura/src/lib/hasura";
import { AssetKey } from "../../../../../../../shared/src/types/asset";
import { syncAsset } from "../../../../api/asset/sync";

export interface AssetPageProps extends AssetKey {
  mode?: Mode;
}

const AssetPage: NextPage<AssetPageProps> = ({ chainId, contractAddress, tokenId, mode }) => {
  const [asset, setAssets] = React.useState<AssetFragment>();

  const { where } = React.useMemo(() => {
    return toHasuraCondition({ chainId, contractAddress, tokenId });
  }, [chainId, contractAddress, tokenId]);

  const { data } = useAssetQuery({
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

  return <AssetTemplate asset={asset} mode={mode} />;
};

export default AssetPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
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
  // TODO: better management
  syncAsset(asset);
  return {
    props: { ...asset, mode: context.query.mode ? context.query.mode : "normal" },
  };
};
