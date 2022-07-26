import { HomeTemplate } from "components/templates/Home";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { AssetFragment, useAssetsQuery } from "../../../hasura/dist/graphql";
import { HasuraVariables, toHasuraCondition } from "../../../hasura/src/lib/hasura";

export interface HomePageProps {
  variables: HasuraVariables;
}

const HomePage: NextPage<HomePageProps> = ({ variables }) => {
  const [assets, setAssets] = React.useState<AssetFragment[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const { query } = useRouter();
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

  return <HomeTemplate assets={assets} loadMore={loadMore} hasMore={hasMore} />;
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const variables = toHasuraCondition(context.query);

  return {
    props: { variables },
  };
};
