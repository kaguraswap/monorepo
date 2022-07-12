import { ethers } from "ethers";

import networks from "../../../common/configs/networks.json";
import { validate } from "../../../common/entities/nft";
import { ADDRESS_NULL } from "../../../common/utils/constant";
import IERC2981Artifact from "../../../sdk/artifacts/@openzeppelin/contracts/interfaces/IERC2981.sol/IERC2981.json";
import { IERC2981 } from "../../../sdk/typechain";
import { cors } from "../lib/cors";
import { functions } from "../lib/functions";

export const get = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    const { nft: _nft, price } = req.body.data;
    const nft = validate(_nft);
    if (!nft) {
      res.send({ status: false, data: "not found" });
      return;
    }
    const { rpc } = networks[nft.chainId];
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const erc2981 = <IERC2981>new ethers.Contract(nft.contractAddress, IERC2981Artifact.abi, provider);
    const { receiver, royaltyAmount } = await erc2981.royaltyInfo(nft.tokenId, price).catch(() => {
      return { receiver: ADDRESS_NULL, royaltyAmount: "0" };
    });
    res.send({ status: true, data: { receiver, royaltyAmount } });
  });
});
