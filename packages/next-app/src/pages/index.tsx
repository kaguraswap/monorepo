import { HomeTemplate, HomeTemplateProps } from "components/templates/Home";
import { toHasuraCondition } from "lib/hasura";
import { isEmpty } from "lib/utils";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { HasuraVariables } from "types/hasura";

import { AssetsFragment, useHomeSubscription } from "../../../hasura/dist/graphql";

// TODO: add load
const HomePage: NextPage<HomeTemplateProps> = () => {
  const [assets, setAssets] = React.useState<AssetsFragment[]>([]);
  const [variables, setVariables] = React.useState<HasuraVariables>({ where: {}, orderBy: {}, limit: 40 });
  const { query } = useRouter();
  const { data } = useHomeSubscription({
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
