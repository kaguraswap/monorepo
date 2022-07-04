import React from "react";

import { Asset } from "../../../../../common/types/asset";
import { AssetDetail } from "../../organisms/AssetDetail";
import { DefaultLayout } from "../../utils/layout";

export interface AssetTemplateProps {
  asset: Asset;
}

export const AssetTemplate: React.FC<AssetTemplateProps> = ({ asset }) => {
  return (
    <DefaultLayout>
      <AssetDetail asset={asset} />
    </DefaultLayout>
  );
};
