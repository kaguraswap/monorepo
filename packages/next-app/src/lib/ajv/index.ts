import Ajv from "ajv";
import { ethers } from "ethers";

import { isChainId } from "../../../../common/types/network";

export const ajv = new Ajv();

ajv.addFormat("address", {
  validate: (address: string) => {
    return ethers.utils.isAddress(address);
  },
});

ajv.addFormat("chainId", {
  validate: (chainId: string) => {
    return isChainId(chainId);
  },
});

ajv.addFormat("tokenId", {
  validate: (tokenId: string) => {
    try {
      return ethers.BigNumber.from(tokenId).gte(0);
    } catch {
      return false;
    }
  },
});

export const assetSchema = {
  properties: {
    chainId: { type: "string", format: "chainId" },
    contractAddress: { type: "string", format: "address" },
    tokenId: { type: "string", format: "tokenId" },
  },
  required: ["chainId", "contractAddress", "tokenId"],
};
