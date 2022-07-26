import { AssetsTemplate } from "components/templates/Assets";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { AssetFragment, useAssetsQuery } from "../../../../hasura/dist/graphql";
import { HasuraVariables, toHasuraCondition } from "../../../../hasura/src/lib/hasura";

export interface AssetsPageProps {
  variables: HasuraVariables;
}

const AssetsPage: NextPage<AssetsPageProps> = ({ variables }) => {
  const [assets, setAssets] = React.useState<AssetFragment[]>([]);
  const { query } = useRouter();
  const [hasMore, setHasMore] = React.useState(true);

  const { data, fetchMore, refetch } = useAssetsQuery({
    variables,
  });
  React.useEffect(() => {
    if (!data) {
      return;
    }
    setAssets(data.assets);
    if (data.assets_aggregate.aggregate?.count) {
      setHasMore(data.assets_aggregate.aggregate?.count > data.assets.length);
    }
  }, [data]);

  React.useEffect(() => {
    const variables = toHasuraCondition(query);
    refetch(variables);
  }, [refetch, query]);

  const loadMore = () => {
    fetchMore({
      variables: {
        offset: assets.length,
      },
    });
  };
  return <AssetsTemplate assets={assets} loadMore={loadMore} hasMore={hasMore} />;
};

export default AssetsPage;
