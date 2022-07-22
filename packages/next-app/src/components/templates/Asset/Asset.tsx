import { Asset } from "components/organisms/Asset";
import { DefaultLayout } from "components/utils/layout";
import React from "react";
import { Action, Mode } from "types/ui";

import { AssetFragment } from "../../../../../hasura/dist/graphql";

export interface AssetTemplateProps {
  asset?: AssetFragment;
  mode?: Mode;
  action?: Action;
}

export const AssetTemplate: React.FC<AssetTemplateProps> = ({ asset, mode, action }) => {
  // TODO: improve load process
  return <DefaultLayout mode={mode}>{asset && <Asset asset={asset} action={action} />}</DefaultLayout>;
};
