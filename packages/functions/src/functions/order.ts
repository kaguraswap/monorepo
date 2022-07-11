import { ethers } from "ethers";
import * as admin from "firebase-admin";

import networks from "../../../common/configs/networks.json";
import { isChainId } from "../../../common/entities/network";
import { INVALID_ARGUMENT, ORDER_VERIFICATION_FAILED } from "../../../common/utils/error";
import { KaguraSDK } from "../../../sdk/lib";
import { cors } from "../lib/cors";
import { functions } from "../lib/functions";

const db = admin.firestore();

export const create = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    const { type, nft, signedOrder } = req.body.data;
    const { chainId } = nft;
    if (!isChainId(chainId)) {
      throw new Error(INVALID_ARGUMENT);
    }
    const { rpc } = networks[chainId];
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const sdk = new KaguraSDK(provider);
    const isValid = await sdk.order.validate(type, signedOrder);
    if (!isValid) {
      throw new Error(ORDER_VERIFICATION_FAILED);
    }
    const hash = await sdk.order.hash(type, signedOrder);
    const orderDoc = {
      type,
      chainId,
      nft,
      isValid,
      signedOrder,
      id: hash,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection("orders").doc(hash).set(orderDoc, { merge: true });
    res.send({ status: true, data: orderDoc });
  });
});
