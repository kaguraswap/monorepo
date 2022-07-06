import axios from "axios";

import { NFT } from "../../../../common/types/nft";

export interface Item {
  supports_erc: string[];
  contract_address: string;
  nft_data: {
    token_id: string;
    owner: string;
    external_data: { name: string; description: string; image: string; animation_url: string };
  }[];
}

export class Covelant {
  apiKey: string;
  covalentAPIBaseUri = "https://api.covalenthq.com/v1";

  constructor(apiKey?: string) {
    if (!apiKey) {
      throw new Error("covalent api key invalid");
    }
    this.apiKey = apiKey;
  }

  getNFT = async (chainId: string, contractAddress: string, tokenId: string): Promise<NFT> => {
    const response = await axios.get(
      `${this.covalentAPIBaseUri}/${chainId}/tokens/${contractAddress}/nft_metadata/${tokenId}/?key=${this.apiKey}`
    );
    const [item] = response.data.data.items;
    const nft: NFT = {
      chainId,
      ...this.convertItemToNFT(item),
    };
    return nft;
  };

  getNFTsByWalletAddress = async (chainId: string, walletAddress: string): Promise<NFT[]> => {
    const response = await axios.get(
      `${this.covalentAPIBaseUri}/${chainId}/address/${walletAddress}/balances_v2/?nft=true&key=${this.apiKey}`
    );
    const { items } = response.data.data;
    const nfts: NFT[] = items
      .filter((item: Item) => {
        return item.supports_erc && item.supports_erc.includes("erc721");
      })
      .map((item: Item) => {
        return {
          chainId,
          ...this.convertItemToNFT(item),
        };
      });
    return nfts;
  };

  convertItemToNFT = (item: Item) => {
    const [nftData] = item.nft_data;
    const externalData = nftData.external_data;
    return {
      contractAddress: item.contract_address,
      tokenId: nftData.token_id,
      holder: nftData.owner,
      metadata: {
        name: externalData.name,
        description: externalData.description,
        image: externalData.image,
        animationUrl: externalData.animation_url,
      },
    };
  };
}

export const covelant = new Covelant(process.env.COVALENT_API_KEY);
