import { Cancel } from "components/organisms/Cancel";
import { DefaultLayout } from "components/utils/layout";
import React from "react";
import { Mode } from "types/ui";

export interface CancelTemplateProps {
  mode?: Mode;
}

export const CancelTemplate: React.FC<CancelTemplateProps> = ({ mode }) => {
  return (
    <DefaultLayout mode={mode}>
      <Cancel />
    </DefaultLayout>
  );
};
