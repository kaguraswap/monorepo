import { Asset } from "components/organisms/Asset";
import { DefaultLayout } from "components/utils/layout";
import React from "react";

import { AssetFragment } from "../../../../../shared/dist/graphql";

export interface AssetTemplateProps {
  asset?: AssetFragment;
}

export const AssetTemplate: React.FC<AssetTemplateProps> = ({ asset }) => {
  // TODO: improve load process
  return <DefaultLayout>{asset && <Asset asset={asset} />}</DefaultLayout>;
};
