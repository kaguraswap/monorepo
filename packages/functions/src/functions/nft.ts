import axios from "axios";
import { ethers } from "ethers";
import * as admin from "firebase-admin";

import networks from "../../../common/configs/networks.json";
import { NFTMetadata, SupportsInterface, toKey, validate } from "../../../common/entities/nft";
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
    const { rpc } = networks[nft.chainId];
    const provider = new ethers.providers.JsonRpcProvider(rpc);

    const code = await provider.getCode(nft.contractAddress).catch(() => "0x");
    const isContract = code !== "0x";

    const supportsInterface: SupportsInterface = {};
    if (isContract) {
      const erc165 = <IERC165>new ethers.Contract(nft.contractAddress, IERC165Artifact.abi, provider);
      supportsInterface.isERC165 = await erc165.supportsInterface(ERC165_ID).catch(() => false);
      if (supportsInterface.isERC165) {
        supportsInterface.isERC721 = await erc165.supportsInterface(ERC721_ID).catch(() => false);
        if (supportsInterface.isERC721) {
          supportsInterface.isERC721Metadata = await erc165.supportsInterface(ERC721_METADATA_ID).catch(() => false);
        }
      }
    }

    let holder = "";
    if (supportsInterface.isERC721) {
      const erc721 = <IERC721>new ethers.Contract(nft.contractAddress, IERC721Artifact.abi, provider);
      holder = await erc721.ownerOf(nft.tokenId).catch(() => "");
    }

    let tokenURI = "";
    if (supportsInterface.isERC721Metadata && holder) {
      const erc721Metadata = <IERC721Metadata>(
        new ethers.Contract(nft.contractAddress, IERC721MetadataArtifact.abi, provider)
      );
      tokenURI = await erc721Metadata.tokenURI(nft.tokenId).catch(() => "");
    }

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
      isContract,
      supportsInterface,
      holder,
      tokenURI,
      metadata,
      id: key,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection("nfts").doc(key).set(nftDoc, { merge: true });
    res.send({ status: true, data: { nftDoc } });
  });
});
