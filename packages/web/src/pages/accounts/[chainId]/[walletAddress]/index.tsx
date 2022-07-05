import { ethers } from "ethers";
import type { GetServerSideProps, NextPage } from "next";

import { isChainId } from "../../../../../../common/types/chainId";
import { AccountTemplate, AccountTemplateProps } from "../../../../components/templates/Account";
import { getNFTsByWalletAddress } from "../../../../lib/nft";

const AccountPage: NextPage<AccountTemplateProps> = ({ nfts }) => {
  return <AccountTemplate nfts={nfts} />;
};

export default AccountPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (
    !context.params ||
    typeof context.params.chainId !== "string" ||
    typeof context.params.walletAddress !== "string" ||
    !isChainId(context.params.chainId) ||
    !ethers.utils.isAddress(context.params.walletAddress)
  ) {
    return {
      notFound: true,
    };
  }
  const nfts = await getNFTsByWalletAddress(context.params.chainId, context.params.walletAddress);
  return {
    props: {
      nfts,
    },
  };
};
