import axios from "axios";
import { ethers } from "ethers";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import networks from "../../../common/configs/networks.json";
import { NFTMetadata, SupportsInterface } from "../../../common/types/nft";
import { ERC165_ID, ERC721_ID, ERC721_METADATA_ID } from "../../../common/utils/constant";
import { toKey, validate } from "../../../common/utils/nft";
import IERC721MetadataArtifact from "../../../contracts/artifacts/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol/IERC721Metadata.json";
import IERC721Artifact from "../../../contracts/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json";
import IERC165Artifact from "../../../contracts/artifacts/@openzeppelin/contracts/utils/introspection/IERC165.sol/IERC165.json";
import { IERC165, IERC721, IERC721Metadata } from "../../../contracts/typechain";

const db = admin.firestore();

export const sync = functions.https.onRequest(async (req, res) => {
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
  await db
    .collection("nfts")
    .doc(key)
    .set({ ...nft, isContract, supportsInterface, holder, tokenURI, metadata }, { merge: true });
  res.send({ status: true, data: "ok" });
});
