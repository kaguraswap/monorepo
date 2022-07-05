import type { GetServerSideProps, NextPage } from "next";

import { nfts } from "../../../common/utils/fixture";
import { HomeTemplate, HomeTemplateProps } from "../components/templates/Home";

const HomePage: NextPage<HomeTemplateProps> = ({ nfts }) => {
  return <HomeTemplate nfts={nfts} />;
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      nfts,
    },
  };
};
