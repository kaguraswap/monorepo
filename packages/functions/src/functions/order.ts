import { Seaport } from "@opensea/seaport-js";
import { ethers } from "ethers";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import networks from "../../../common/configs/networks.json";
import { isChainId } from "../../../common/entities/network";
import { toHash } from "../../../common/entities/order";
import { INVALID_ARGUMENT, NOT_IMPLEMENTED, ORDER_VERIFICATION_FAILED } from "../../../common/utils/error";
import { cors } from "../lib/cors";

const db = admin.firestore();

export const create = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    const { type, nft, order } = req.body.data;
    if (type !== "seaport") {
      throw new Error(NOT_IMPLEMENTED);
    }
    const { chainId } = nft;
    if (!isChainId(chainId)) {
      throw new Error(INVALID_ARGUMENT);
    }
    const { rpc } = networks[chainId];
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const seaport = new Seaport(provider);
    const isValid = await seaport
      .validate([order], nft.holder)
      .callStatic()
      .catch(() => false);
    if (!isValid) {
      throw new Error(ORDER_VERIFICATION_FAILED);
    }
    const hash = seaport.getOrderHash(order.parameters);
    const orderDoc = {
      type,
      chainId,
      nft,
      hash,
      isValid,
      raw: order,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const key = await toHash(order);
    await db.collection("orders").doc(key).set(orderDoc, { merge: true });
    res.send({ status: true, data: orderDoc });
  });
});
