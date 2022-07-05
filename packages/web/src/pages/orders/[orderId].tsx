import type { GetServerSideProps, NextPage } from "next";

import { nft } from "../../../../common/utils/fixture";
import { NFTTemplate } from "../../components/templates/NFT";

const NFTPage: NextPage = () => {
  return <NFTTemplate nft={nft} />;
};

export default NFTPage;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      nft,
    },
  };
};
