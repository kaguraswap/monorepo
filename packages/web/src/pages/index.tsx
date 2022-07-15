import type { NextPage } from "next";
import React from "react";

import { useNftHasValidOrderQuery } from "../../../common/dist/graphql";
import { HomeTemplate, HomeTemplateProps } from "../components/templates/Home";

const HomePage: NextPage<HomeTemplateProps> = () => {
  const [syncedNFTsState, setSynceNFTsState] = React.useState<any>([]);
  const { data } = useNftHasValidOrderQuery();

  React.useEffect(() => {
    if (!data) {
      return;
    }
    setSynceNFTsState(data.nft);
  }, [data]);

  return <HomeTemplate nfts={syncedNFTsState} />;
};

export default HomePage;
