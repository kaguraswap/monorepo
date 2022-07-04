import type { GetServerSideProps, NextPage } from "next";

import { asset } from "../../../../../../common/utils/fixture";
import { AssetTemplate } from "../../../../components/templates/Asset";

const AssetPage: NextPage = () => {
  return <AssetTemplate asset={asset} />;
};

export default AssetPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      asset,
    },
  };
};
