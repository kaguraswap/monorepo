import type { NextPage } from "next";
import React from "react";

import { useHomePageSubscription } from "../../../common/dist/graphql";
import { HomeTemplate, HomeTemplateProps } from "../components/templates/Home";

const HomePage: NextPage<HomeTemplateProps> = () => {
  const [syncedNFTsState, setSynceNFTsState] = React.useState<any>([]);
  const { data } = useHomePageSubscription();

  React.useEffect(() => {
    if (!data) {
      return;
    }
    setSynceNFTsState(data.nft);
  }, [data]);

  return <HomeTemplate nfts={syncedNFTsState} />;
};

export default HomePage;
