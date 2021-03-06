import axios from "axios";
import { ethers } from "ethers";
import httpError from "http-errors";
import { AssetKey, validate } from "lib/ajv";
import type { NextApiRequest, NextApiResponse } from "next";

import IERC721MetadataArtifact from "../../../../../hardhat/dist/artifacts/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol/IERC721Metadata.json";
import IERC721Artifact from "../../../../../hardhat/dist/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json";
import { IERC721, IERC721Metadata } from "../../../../../hardhat/dist/types";
import { models } from "../../../../../hasura/src/lib/sequelize";
import { AssetMetadata } from "../../../../../hasura/src/types/asset-metadata";
import networks from "../../../../../shared/src/configs/networks.json";
import { error } from "../../../../../shared/src/utils/error";

export const syncAsset = async (params: AssetKey) => {
  if (!validate.assetKey(params)) {
    throw httpError(error.invalidArgument.code, error.invalidArgument.message);
  }
  const { chainId, tokenId } = params;
  let { contractAddress } = params;
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
  return { asset };
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const asset = await syncAsset(req.body);
  res.status(200).json({ asset });
};

export default handler;
