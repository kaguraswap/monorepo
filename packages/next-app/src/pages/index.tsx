import { HomeTemplate, HomeTemplateProps } from "components/templates/Home";
import type { NextPage } from "next";
import React from "react";

import { AssetsFragment, useHomeSubscription } from "../../../common/dist/graphql";

const HomePage: NextPage<HomeTemplateProps> = () => {
  const [assets, setAssets] = React.useState<AssetsFragment[]>([]);
  const { data } = useHomeSubscription({ variables: { condition: {} } });
  React.useEffect(() => {
    if (!data) {
      return;
    }
    setAssets(data.assets);
  }, [data]);

  return <HomeTemplate assets={assets} />;
};

export default HomePage;
