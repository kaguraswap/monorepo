import { Fulfill } from "components/organisms/Fulfill";
import { DefaultLayout } from "components/utils/layout";
import React from "react";
import { Mode } from "types/ui";

export interface FulfillTemplateProps {
  mode?: Mode;
}

export const FulfillTemplate: React.FC<FulfillTemplateProps> = ({ mode }) => {
  return (
    <DefaultLayout mode={mode}>
      <Fulfill />
    </DefaultLayout>
  );
};
