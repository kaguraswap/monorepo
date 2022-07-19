import { HomeTemplate, HomeTemplateProps } from "components/templates/Home";
import { parsedUrlQueryToHasuraCondition } from "lib/utils";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { HasuraCondition } from "types/HasuraCondition";

import { AssetsFragment, useHomeSubscription } from "../../../common/dist/graphql";

const HomePage: NextPage<HomeTemplateProps> = () => {
  const [assets, setAssets] = React.useState<AssetsFragment[]>([]);
  const [condition, setCondition] = React.useState<HasuraCondition>({});

  const router = useRouter();

  const { data } = useHomeSubscription({
    variables: {
      condition: condition,
    },
  });
  React.useEffect(() => {
    const condition = parsedUrlQueryToHasuraCondition(router.query);
    setCondition(condition);
    if (!data) {
      return;
    }
    setAssets(data.assets);
  }, [data, router.query]);

  return <HomeTemplate assets={assets} />;
};

export default HomePage;
