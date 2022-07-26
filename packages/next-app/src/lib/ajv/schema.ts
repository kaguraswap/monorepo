export const schema = {
  blockKey: {
    type: "object",
    properties: {
      chainId: { type: "string", format: "chainId" },
      blockNumber: { type: "number" },
    },
    required: ["chainId", "blockNumber"],
    additionalProperties: false,
  },
  contractKey: {
    type: "object",
    properties: {
      chainId: { type: "string", format: "chainId" },
      contractAddress: { type: "string", format: "address" },
    },
    required: ["chainId", "contractAddress"],
    additionalProperties: false,
  },
  assetKey: {
    type: "object",
    properties: {
      chainId: { type: "string", format: "chainId" },
      contractAddress: { type: "string", format: "address" },
      tokenId: { type: "string", format: "tokenId" },
    },
    required: ["chainId", "contractAddress", "tokenId"],
    additionalProperties: false,
  },

  syncTransactionParams: {
    type: "object",
    properties: {
      chainId: { type: "string", format: "chainId" },
      blockNumber: { type: "number" },
      transactionIndex: { type: "number" },
      transactionHash: { type: "string" },
    },
    required: ["chainId", "blockNumber", "transactionIndex"],
    additionalProperties: false,
  },
  orderCreateParams: {
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
  },
};
