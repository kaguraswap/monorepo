import type { GetServerSideProps, NextPage } from "next";

import { assets } from "../../../../../common/utils/fixture";
import { PortofolioTemplate, PortofolioTemplateProps } from "../../../components/templates/Portofolio";

const HomePage: NextPage<PortofolioTemplateProps> = ({ assets }) => {
  return <PortofolioTemplate assets={assets} />;
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      assets,
    },
  };
};
