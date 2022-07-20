import { HomeTemplate, HomeTemplateProps } from "components/templates/Home";
import { toHasuraCondition } from "lib/hasura";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { HasuraCondition } from "types/hasura";

import { AssetsFragment, useHomeSubscription } from "../../../common/dist/graphql";

// TODO: add load

// const orderBy = { order_by: { orders_aggregate: { min: { sortablePrice: "asc" } } } };
const HomePage: NextPage<HomeTemplateProps> = () => {
  const [assets, setAssets] = React.useState<AssetsFragment[]>([]);
  const [where, setWhere] = React.useState<HasuraCondition>({});
  const [orderBy, setOrderBy] = React.useState<HasuraCondition>({});
  const { query } = useRouter();
  const { data } = useHomeSubscription({
    variables: {
      where,
      orderBy,
    },
  });
  React.useEffect(() => {
    if (!data) {
      return;
    }
    setAssets(data.assets);
  }, [data]);

  React.useEffect(() => {
    console.log("query", query);
    const { where, orderBy } = toHasuraCondition(query);
    console.log("where", where);
    setWhere(where);
    setOrderBy(orderBy);
  }, [query]);

  return <HomeTemplate assets={assets} />;
};

export default HomePage;
