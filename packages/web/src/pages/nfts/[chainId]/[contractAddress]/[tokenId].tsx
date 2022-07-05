import { ethers } from "ethers";
import type { GetServerSideProps, NextPage } from "next";

import { isChainId } from "../../../../../../common/types/chainId";
import { NFTTemplate, NFTTemplateProps } from "../../../../components/templates/NFT";
import { getNFT } from "../../../../lib/nft";

const NFTPage: NextPage<NFTTemplateProps> = ({ nft }) => {
  return <NFTTemplate nft={nft} />;
};

export default NFTPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (
    !context.params ||
    typeof context.params.chainId !== "string" ||
    typeof context.params.contractAddress !== "string" ||
    typeof context.params.tokenId !== "string" ||
    !isChainId(context.params.chainId) ||
    !ethers.utils.isAddress(context.params.contractAddress)
  ) {
    return {
      notFound: true,
    };
  }
  const nft = await getNFT(context.params.chainId, context.params.contractAddress, context.params.tokenId);
  return {
    props: {
      nft,
    },
  };
};
