import type { GetServerSideProps, NextPage } from "next";

import { collection } from "../../../../../../common/utils/fixture";
import { CollectionTemplate, CollectionTemplateProps } from "../../../../components/templates/Collection";

const CollectionPage: NextPage<CollectionTemplateProps> = ({ collection }) => {
  return <CollectionTemplate collection={collection} />;
};

export default CollectionPage;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      collection,
    },
  };
};
