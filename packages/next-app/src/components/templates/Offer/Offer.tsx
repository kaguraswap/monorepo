import { Offer } from "components/organisms/Offer";
import { DefaultLayout } from "components/utils/layout";
import React from "react";
import { Mode } from "types/ui";

export interface OfferTemplateProps {
  mode?: Mode;
}

export const OfferTemplate: React.FC<OfferTemplateProps> = ({ mode }) => {
  return (
    <DefaultLayout mode={mode}>
      <Offer />
    </DefaultLayout>
  );
};
