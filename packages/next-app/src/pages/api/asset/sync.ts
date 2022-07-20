import axios from "axios";
import { ethers } from "ethers";
import { ajv } from "lib/ajv";
import type { NextApiRequest, NextApiResponse } from "next";

import IERC721MetadataArtifact from "../../../../../hardhat/artifacts/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol/IERC721Metadata.json";
import IERC721Artifact from "../../../../../hardhat/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json";
import { IERC721, IERC721Metadata } from "../../../../../hardhat/typechain";
import { AssetAttributes } from "../../../../../hasura/dist/entity/init-models";
import { models } from "../../../../../hasura/src/sequelize";
import { AssetMetadata } from "../../../../../hasura/src/types/asset-metadata";
import networks from "../../../../../shared/src/configs/networks.json";
import { ChainId } from "../../../../../shared/src/types/network";
import { INVALID_ARGUMENT } from "../../../../../shared/src/utils/error";

// TODO: error handling
const assetSyncPropsSchema = {
  type: "object",
  properties: {
    chainId: { type: "string", format: "chainId" },
    contractAddress: { type: "string", format: "address" },
    tokenId: { type: "string", format: "tokenId" },
  },
  required: ["chainId", "contractAddress", "tokenId"],
  additionalProperties: false,
};

export interface AssetSyncProps extends Pick<AssetAttributes, "contractAddress" | "tokenId"> {
  chainId: ChainId;
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const validate = ajv.compile<AssetSyncProps>(assetSyncPropsSchema);
  if (!validate(req.body)) {
    throw new Error(INVALID_ARGUMENT);
  }
  const { chainId, tokenId } = req.body;
  let { contractAddress } = req.body;
  contractAddress = contractAddress.toLowerCase();

  const { rpc } = networks[chainId];
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const erc721 = <IERC721>new ethers.Contract(contractAddress, IERC721Artifact.abi, provider);
  const erc721Metadata = <IERC721Metadata>new ethers.Contract(contractAddress, IERC721MetadataArtifact.abi, provider);
  const resolved = await Promise.all([
    erc721Metadata.tokenURI(tokenId).catch(() => ""),
    erc721.ownerOf(tokenId).catch(() => ""),
  ]);
  const [tokenURI] = resolved;
  let [, holder] = resolved;
  holder = holder.toLowerCase();
  const metadata: AssetMetadata = {};
  if (tokenURI) {
    const tokenURIResponse = await axios.get(tokenURI).catch(() => undefined);
    if (tokenURIResponse) {
      const { data } = tokenURIResponse;
      metadata.name = data.name || "";
      metadata.description = data.description || "";
      metadata.image = data.image || "";
      metadata.animationUrl = data.animation_url || "";
    }
  }
  const [asset] = await models.Asset.upsert({
    chainId,
    contractAddress,
    tokenId,
    holder,
    metadata,
    amount: 1,
  });
  res.status(200).json({ asset });
};

export default handler;
