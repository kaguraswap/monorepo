import axios from "axios";
import { ethers } from "ethers";
import httpError from "http-errors";
import { validate } from "lib/ajv";
import { isEmpty } from "lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";

import IERC721MetadataArtifact from "../../../../../hardhat/dist/artifacts/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol/IERC721Metadata.json";
import IERC721Artifact from "../../../../../hardhat/dist/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json";
import { IERC721, IERC721Metadata } from "../../../../../hardhat/dist/types";
import { AssetAttributes } from "../../../../../hasura/dist/entity/asset";
import { models, sequelize } from "../../../../../hasura/src/lib/sequelize";
import networks from "../../../../../shared/src/configs/networks.json";
import { AssetKey } from "../../../../../shared/src/types/asset";
import { AssetMetadata } from "../../../../../shared/src/types/asset-metadata";
import { error } from "../../../../../shared/src/utils/error";

export const syncAsset = async (params: AssetKey) => {
  if (!validate.assetKey(params)) {
    throw httpError(error.invalidArgument.code, error.invalidArgument.message);
  }
  let { chainId, tokenId, contractAddress } = params;
  contractAddress = contractAddress.toLowerCase();
  const { rpc } = networks[chainId];
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const erc721 = <IERC721>new ethers.Contract(contractAddress, IERC721Artifact.abi, provider);
  const erc721Metadata = <IERC721Metadata>new ethers.Contract(contractAddress, IERC721MetadataArtifact.abi, provider);
  const resolved = await Promise.all([
    erc721Metadata.tokenURI(tokenId).catch(() => ""),
    erc721.ownerOf(tokenId).catch(() => ""),
  ]);
  let [tokenURI, holder] = resolved;
  holder = holder.toLowerCase();
  const metadata: AssetMetadata = {};

  /*
   * TODO: #277
   */
  if (tokenURI) {
    const { data } = await axios.get(tokenURI).catch(() => {
      return { data: undefined };
    });
    if (data) {
      metadata.name = data.name || "";
      metadata.description = data.description || "";
      metadata.image = data.image || "";
      metadata.animationUrl = data.animation_url || "";
    }
  }
  const { asset } = await sequelize.transaction(async (t) => {
    await models.Contract.upsert({ chainId, contractAddress }, { transaction: t });

    /*
     * @dev only include not empty value in upsert field
     *      this is required to prevent null-override when connection error happens
     */
    const assetFields: (keyof AssetAttributes)[] = ["isSynced"];
    if (holder) {
      assetFields.push("holder");
    }
    if (!isEmpty(metadata)) {
      assetFields.push("metadata");
    }
    const [asset] = await models.Asset.upsert(
      { chainId, contractAddress, tokenId, holder, metadata, amount: 1 },
      { fields: assetFields, transaction: t }
    );
    return { asset };
  });
  return { asset };
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { asset } = await syncAsset(req.body);
  res.status(200).json({ asset });
};

export default handler;
