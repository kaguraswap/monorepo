import type { GetServerSideProps, NextPage } from "next";

import { assets } from "../../../common/utils/fixture";
import { HomeTemplate, HomeTemplateProps } from "../components/templates/Home";

const HomePage: NextPage<HomeTemplateProps> = ({ assets }) => {
  return <HomeTemplate assets={assets} />;
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      assets,
    },
  };
};
