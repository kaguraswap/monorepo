import axios from "axios";
import { ethers } from "ethers";
import { ajv } from "lib/ajv";
import { models } from "lib/sequelize";
import type { NextApiRequest, NextApiResponse } from "next";

import networks from "../../../../../common/configs/networks.json";
import { AssetAttributes } from "../../../../../common/dist/entity/init-models";
import { AssetMetadata } from "../../../../../common/types/asset-metadata";
import { ChainId } from "../../../../../common/types/network";
import { INVALID_ARGUMENT } from "../../../../../common/utils/error";
import IERC721MetadataArtifact from "../../../../../hardhat/artifacts/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol/IERC721Metadata.json";
import IERC721Artifact from "../../../../../hardhat/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json";
import { IERC721, IERC721Metadata } from "../../../../../hardhat/typechain";

// TODO: error
// TODO: common asset schema

const assetSyncPropsSchema = {
  type: "object",
  properties: {
    chainId: { type: "string" },
    contractAddress: { type: "string" },
    tokenId: { type: "string" },
  },
  required: ["chainId", "contractAddress", "tokenId"],
  additionalProperties: false,
};

export type AssetSyncProps = Pick<AssetAttributes, "chainId" | "contractAddress" | "tokenId">;

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const validate = ajv.compile<AssetSyncProps>(assetSyncPropsSchema);
  if (!validate(req.body)) {
    throw new Error(INVALID_ARGUMENT);
  }
  const { chainId, tokenId } = req.body;
  let { contractAddress } = req.body;
  contractAddress = contractAddress.toLowerCase();

  const { rpc } = networks[chainId as ChainId];
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
