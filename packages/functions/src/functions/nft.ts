import axios from "axios";
import { ethers } from "ethers";
import * as admin from "firebase-admin";

import networks from "../../../common/configs/networks.json";
import { NFT, NFTMetadata, toKey, validate } from "../../../common/entities/nft";
import { ERC165_ID, ERC721_ID, ERC721_METADATA_ID } from "../../../common/utils/constant";
import IERC721MetadataArtifact from "../../../sdk/artifacts/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol/IERC721Metadata.json";
import IERC721Artifact from "../../../sdk/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json";
import IERC165Artifact from "../../../sdk/artifacts/@openzeppelin/contracts/utils/introspection/IERC165.sol/IERC165.json";
import { IERC165, IERC721, IERC721Metadata } from "../../../sdk/typechain";
import { cors } from "../lib/cors";
import { functions } from "../lib/functions";

const db = admin.firestore();

export const sync = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    const nft = validate(req.body.data);
    if (!nft) {
      res.send({ status: false, data: "not found" });
      return;
    }
    const key = toKey(nft);
    const previousDoc = await db.collection("nfts").doc(key).get();
    const previousDocData = <NFT>previousDoc.data();
    const { rpc } = networks[nft.chainId];
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const erc165 = <IERC165>new ethers.Contract(nft.contractAddress, IERC165Artifact.abi, provider);
    const erc721 = <IERC721>new ethers.Contract(nft.contractAddress, IERC721Artifact.abi, provider);
    const erc721Metadata = <IERC721Metadata>(
      new ethers.Contract(nft.contractAddress, IERC721MetadataArtifact.abi, provider)
    );
    const [isERC165, isERC721, isERC721Metadata, tokenURI, holder] = await Promise.all([
      erc165.supportsInterface(ERC165_ID).catch(() => false),
      erc165.supportsInterface(ERC721_ID).catch(() => false),
      erc165.supportsInterface(ERC721_METADATA_ID).catch(() => false),
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
      supportsInterface: {
        isERC165,
        isERC721,
        isERC721Metadata,
      },
      holder,
      tokenURI,
      metadata,
      id: key,
      createdAt: previousDocData ? previousDocData.createdAt : admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection("nfts").doc(key).set(nftDoc, { merge: true });
    res.send({ status: true, data: { nftDoc } });
  });
});
