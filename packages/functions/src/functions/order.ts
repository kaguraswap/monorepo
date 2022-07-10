import { Seaport } from "@opensea/seaport-js";
import { NftSwapV4 as ZeroEx } from "@traderxyz/nft-swap-sdk";
import { ethers } from "ethers";
import * as admin from "firebase-admin";

import networks from "../../../common/configs/networks.json";
import { isChainId } from "../../../common/entities/network";
import { INVALID_ARGUMENT, NOT_IMPLEMENTED, ORDER_VERIFICATION_FAILED } from "../../../common/utils/error";
import { cors } from "../lib/cors";
import { functions } from "../lib/functions";

const db = admin.firestore();

export const create = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    const { type, nft, order } = req.body.data;

    const { chainId } = nft;
    if (!isChainId(chainId)) {
      throw new Error(INVALID_ARGUMENT);
    }
    const { rpc } = networks[chainId];
    const provider = new ethers.providers.JsonRpcProvider(rpc);

    let isValid;
    let hash;

    if (type === "seaport") {
      const seaport = new Seaport(provider);
      isValid = await seaport
        .validate([order], nft.holder)
        .callStatic()
        .catch(() => false);
      hash = seaport.getOrderHash(order.parameters);
    } else if (type === "zeroEx") {
      isValid = true;
      hash = "hash";
    } else {
      throw new Error(NOT_IMPLEMENTED);
    }

    if (!isValid) {
      throw new Error(ORDER_VERIFICATION_FAILED);
    }

    const orderDoc = {
      type,
      chainId,
      nft,
      hash,
      isValid,
      raw: order,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection("orders").doc(hash).set(orderDoc, { merge: true });
    res.send({ status: true, data: orderDoc });
  });
});
