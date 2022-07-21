import { Assets } from "components/organisms/Assets";
import { DefaultLayout } from "components/utils/layout";
import React from "react";

import { AssetFragment } from "../../../../../hasura/dist/graphql";

export interface HomeTemplateProps {
  assets: AssetFragment[];
  loadMore: () => void;
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({ assets, loadMore }) => {
  return (
    <DefaultLayout>
      <Assets assets={assets} loadMore={loadMore} />
    </DefaultLayout>
  );
};
