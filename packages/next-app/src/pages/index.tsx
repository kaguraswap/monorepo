import { HomeTemplate, HomeTemplateProps } from "components/templates/Home";
import { isEmpty } from "lib/utils";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { AssetFragment, useAssetsQuery } from "../../../hasura/dist/graphql";
import { HasuraVariables, toHasuraCondition } from "../../../hasura/src/lib/hasura";

// TODO: add load
const HomePage: NextPage<HomeTemplateProps> = () => {
  const [assets, setAssets] = React.useState<AssetFragment[]>([]);
  const [variables, setVariables] = React.useState<HasuraVariables>({ where: {}, orderBy: {}, offset: 0, limit: 30 });
  const { query } = useRouter();
  const { data, fetchMore } = useAssetsQuery({
    variables,
  });
  React.useEffect(() => {
    if (!data) {
      return;
    }
    setAssets(data.assets);
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
        offset: variables.offset,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          assets: [...prev.assets, ...fetchMoreResult.assets],
        });
      },
    });
  };

  return <HomeTemplate assets={assets} loadMore={loadMore} />;
};

export default HomePage;
