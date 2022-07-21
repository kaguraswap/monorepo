import { Assets } from "components/organisms/Assets";
import { DefaultLayout } from "components/utils/layout";
import React from "react";

import { AssetsFragment } from "../../../../../hasura/dist/graphql";

export interface HomeTemplateProps {
  assets: AssetsFragment[];
  loadMore: () => void;
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({ assets, loadMore }) => {
  return (
    <DefaultLayout>
      <Assets assets={assets} loadMore={() => loadMore()} />
    </DefaultLayout>
  );
};
