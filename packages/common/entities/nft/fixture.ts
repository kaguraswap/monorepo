import { ADDRESS_1 } from "../../utils/constant";
import { NFT } from "./type";

export const nfts: NFT[] = [
  {
    chainId: "1",
    contractAddress: ADDRESS_1,
    tokenId: "0",
    holder: ADDRESS_1,
    metadata: {
      name: "nft name",
      description:
        "With a sleek design and a captivating essence, this is a modern Classic made for every occasion.asset description",
      image: "https://via.placeholder.com/350x350",
    },
  },
  {
    chainId: "1",
    contractAddress: ADDRESS_1,
    tokenId: "1",
    holder: ADDRESS_1,
    metadata: {
      name: "nft name",
      description:
        "With a sleek design and a captivating essence, this is a modern Classic made for every occasion.asset description",
      image: "https://via.placeholder.com/350x350",
    },
  },
  {
    chainId: "42",
    contractAddress: ADDRESS_1,
    tokenId: "0",
    holder: ADDRESS_1,
    metadata: {
      name: "nft name",
      description: "nft description",
      image: "https://via.placeholder.com/350x350",
    },
  },
  {
    chainId: "42",
    contractAddress: ADDRESS_1,
    tokenId: "1",
    holder: ADDRESS_1,
    metadata: {
      name: "nft name",
      description: "nft description",
      image: "https://via.placeholder.com/350x350",
    },
  },
];

export const [nft] = nfts;
