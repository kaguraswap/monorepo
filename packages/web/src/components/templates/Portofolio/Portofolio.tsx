import React from "react";

import { Asset } from "../../../../../common/types/asset";
import { AssetList } from "../../organisms/AssetList";
import { DefaultLayout } from "../../utils/layout";

export interface PortofolioTemplateProps {
  assets: Asset[];
}

export const PortofolioTemplate: React.FC<PortofolioTemplateProps> = ({ assets }) => {
  return (
    <DefaultLayout>
      <AssetList assets={assets} />
    </DefaultLayout>
  );
};
