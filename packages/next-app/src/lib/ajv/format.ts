import Ajv from "ajv";
import { ethers } from "ethers";

import { isOrderDirection, isOrderProtocol } from "../../../../hasura/src/types/order";
import { isChainId } from "../../../../shared/src/types/network";

export const addFormats = (ajv: Ajv) => {
  ajv.addFormat("address", {
    validate: (address: string) => {
      return ethers.utils.isAddress(address) && address === address.toLowerCase();
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
  ajv.addFormat("protocol", {
    validate: (protocol: string) => {
      return isOrderProtocol(protocol);
    },
  });
  ajv.addFormat("direction", {
    validate: (direction: string) => {
      return isOrderDirection(direction);
    },
  });
};
