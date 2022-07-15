import axios from "axios";
import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

import networks from "../../../../../common/configs/networks.json";
import { NFTMetadata, validate } from "../../../../../common/entities/nft";
import IERC721MetadataArtifact from "../../../../../sdk/artifacts/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol/IERC721Metadata.json";
import IERC721Artifact from "../../../../../sdk/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json";
import { IERC721, IERC721Metadata } from "../../../../../sdk/typechain";
import { orm } from "../../../lib/sequelize";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { nft: _nft } = req.body;
  const nft = validate(_nft);
  if (!nft) {
    res.send({ status: false, data: "not found" });
    return;
  }
  const { rpc } = networks[nft.chainId];
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const erc721 = <IERC721>new ethers.Contract(nft.contractAddress, IERC721Artifact.abi, provider);
  const erc721Metadata = <IERC721Metadata>(
    new ethers.Contract(nft.contractAddress, IERC721MetadataArtifact.abi, provider)
  );
  const [tokenURI, holder] = await Promise.all([
    erc721Metadata.tokenURI(nft.tokenId).catch(() => ""),
    erc721.ownerOf(nft.tokenId).catch(() => ""),
  ]);
  const metadata: NFTMetadata = {};
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

  const nftDoc = {
    ...nft,
    holder,
    metadata,
  };
  await orm.contract.upsert({
    chainId: nft.chainId,
    contractAddress: nft.contractAddress.toLowerCase(),
    supportsInterface: {},
  });
  await orm.nft.upsert({
    ...nftDoc,
    contractAddress: nftDoc.contractAddress.toLowerCase(),
    holder: nftDoc.holder.toLowerCase(),
  });
  res.status(200).json({ nft: nftDoc });
};

export default handler;
