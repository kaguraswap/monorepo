import { Assets } from "components/organisms/Assets";
import { DefaultLayout } from "components/utils/layout";
import React from "react";
import { Mode } from "types/ui";

import { AssetFragment } from "../../../../../hasura/dist/graphql";

export interface HomeTemplateProps {
  assets: AssetFragment[];
  loadMore: () => void;
  mode?: Mode;
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({ assets, loadMore, mode }) => {
  return (
    <DefaultLayout mode={mode}>
      <Assets assets={assets} loadMore={loadMore} />
    </DefaultLayout>
  );
};
