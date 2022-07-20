import { Assets } from "components/organisms/Assets";
import { DefaultLayout } from "components/utils/layout";
import React from "react";

import { AssetsFragment } from "../../../../../shared/dist/graphql";

export interface HomeTemplateProps {
  assets: AssetsFragment[];
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({ assets }) => {
  return (
    <DefaultLayout>
      <Assets assets={assets} />
    </DefaultLayout>
  );
};
