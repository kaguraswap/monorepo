import { HomeTemplate, HomeTemplateProps } from "components/templates/Home";
import { isEmpty } from "lib/utils";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { AssetsFragment, useAssetsQuery } from "../../../hasura/dist/graphql";
import { HasuraVariables, toHasuraCondition } from "../../../hasura/src/lib/hasura";

// TODO: add load
const HomePage: NextPage<HomeTemplateProps> = () => {
  const [assets, setAssets] = React.useState<AssetsFragment[]>([]);
  const [variables, setVariables] = React.useState<HasuraVariables>({ where: {}, orderBy: {}, limit: 40 });
  const { query } = useRouter();
  const { data } = useAssetsQuery({
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
    const newV = { where: variables.where, orderBy: variables.orderBy, limit: variables.limit + 40 };
    setVariables(newV);
  };

  return <HomeTemplate assets={assets} loadMore={() => loadMore()} />;
};

export default HomePage;
