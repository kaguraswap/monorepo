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
  const [variables, setVariables] = React.useState<HasuraVariables>({
    where: {},
    orderBy: {},
    offset: 0,
    limit: INFINITE_SCROLL_NUMBER,
  });
  const [offset, setOffset] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const { query } = useRouter();
  const { data, fetchMore } = useAssetsQuery({
    variables,
  });
  React.useEffect(() => {
    if (!data) {
      return;
    }
    setAssets(data.assets);

    if (data.assets_aggregate.aggregate?.count) setHasMore(data.assets_aggregate.aggregate?.count > data.assets.length);
    setLoading(false);
  }, [data]);

  React.useEffect(() => {
    if (isEmpty(query)) {
      return;
    }
    const variables = toHasuraCondition(query);
    setVariables(variables);
    setOffset(0);
  }, [query]);

  const loadMore = () => {
    if (isLoading) return;
    setLoading(true);
    fetchMore({
      variables: {
        offset: offset + INFINITE_SCROLL_NUMBER,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setOffset(offset + INFINITE_SCROLL_NUMBER);
        return Object.assign({}, prev, {
          assets: prev.assets ? [...prev.assets, ...fetchMoreResult.assets] : [...fetchMoreResult.assets],
        });
      },
    });
  };

  return <HomeTemplate assets={assets} loadMore={() => loadMore()} hasMore={hasMore} />;
};

export default HomePage;
