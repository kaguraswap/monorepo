import React from "react";

import { Asset } from "../../../../../common/types/asset";
import { AssetList } from "../../organisms/AssetList";
import { DefaultLayout } from "../../utils/layout";

export interface HomeTemplateProps {
  assets: Asset[];
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({ assets }) => {
  return (
    <DefaultLayout>
      <AssetList assets={assets} />
    </DefaultLayout>
  );
};
