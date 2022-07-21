import Ajv from "ajv";
import { ethers } from "ethers";

import { SignedOrder } from "../../../../hardhat/types/order";
import { AssetAttributes } from "../../../../hasura/dist/entity/asset";
import { OrderDirection_Enum, OrderProtocol_Enum } from "../../../../hasura/dist/graphql";
import { isOrderDirection, isOrderProtocol } from "../../../../hasura/src/types/order";
import { ChainId, isChainId } from "../../../../shared/src/types/network";

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

export interface AssetKey extends Pick<AssetAttributes, "contractAddress" | "tokenId"> {
  chainId: ChainId;
  contractAddress: string;
  tokenId: string;
}

export interface OrderCreateProps extends AssetKey {
  direction: OrderDirection_Enum;
  protocol: OrderProtocol_Enum;
  signedOrder: SignedOrder;
}

const assetKeySchema = {
  type: "object",
  properties: {
    chainId: { type: "string", format: "chainId" },
    contractAddress: { type: "string", format: "address" },
    tokenId: { type: "string", format: "tokenId" },
  },
  required: ["chainId", "contractAddress", "tokenId"],
  additionalProperties: false,
};

const orderCreatePropsSchema = {
  type: "object",
  properties: {
    protocol: { type: "string", format: "protocol" },
    direction: { type: "string", format: "direction" },
    chainId: { type: "string", format: "chainId" },
    contractAddress: { type: "string", format: "address" },
    tokenId: { type: "string", format: "tokenId" },
    signedOrder: { type: "object" },
  },
  required: ["protocol", "direction", "chainId", "contractAddress", "tokenId", "signedOrder"],
  additionalProperties: false,
};

export const validate = {
  assetKey: ajv.compile<AssetKey>(assetKeySchema),
  createOrderProps: ajv.compile<OrderCreateProps>(orderCreatePropsSchema),
};
