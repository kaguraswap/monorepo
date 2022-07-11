import { Seaport } from "@opensea/seaport-js";
import { OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { ethers } from "ethers";
import * as admin from "firebase-admin";

import { SPAN_SYNC_BLOCKCHAIN } from "../../../common/configs/app";
import networks from "../../../common/configs/networks.json";
import { Order } from "../../../common/entities/order";
import { functions } from "../lib/functions";

const db = admin.firestore();

export const order = functions.pubsub.schedule(SPAN_SYNC_BLOCKCHAIN).onRun(async () => {
  const orderCollection = await db.collection("orders").where("isValid", "==", true).get();

  for (const doc of orderCollection.docs) {
    const order = <Order>doc.data();
    if (!order.signedOrder) {
      return;
    }
    if (order.type === "seaport") {
      order.signedOrder = order.signedOrder as OrderWithCounter;
      const { rpc } = networks[order.chainId];
      const provider = new ethers.providers.JsonRpcProvider(rpc);
      const seaport = new Seaport(provider);
      const isValid = await seaport
        .validate([order.signedOrder], order.signedOrder.parameters.offerer)
        .callStatic()
        .catch(() => false);
      if (!isValid) {
        await db
          .collection("orders")
          .doc(doc.id)
          .set({ isValid, updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
      }
    }
  }
});
