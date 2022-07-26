import { HomeTemplate } from "components/templates/Home";
import { isEmpty } from "lib/utils";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { AssetFragment, useAssetsQuery } from "../../../hasura/dist/graphql";
import { HasuraVariables, toHasuraCondition } from "../../../hasura/src/lib/hasura";
import { INFINITE_SCROLL_NUMBER } from "../../../shared/src/configs/app";

const HomePage: NextPage = () => {
  const [assets, setAssets] = React.useState<AssetFragment[]>([]);
  const [variables, setVariables] = React.useState<HasuraVariables>();
  const [hasMore, setHasMore] = React.useState(true);
  const { query } = useRouter();
  const { data, fetchMore } = useAssetsQuery({
    variables: {
      ...variables,
      limit: INFINITE_SCROLL_NUMBER,
    },
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
    if (isEmpty(query)) {
      return;
    }
    const variables = toHasuraCondition(query);
    setVariables(variables);
  }, [query]);

  const loadMore = () => {
    fetchMore({
      variables: {
        offset: assets.length,
      },
    });
  };

  return (
    <>
      <>{data && data.assets.length}</>
      <HomeTemplate assets={assets} loadMore={() => loadMore()} hasMore={hasMore} />;
    </>
  );
};

export default HomePage;
