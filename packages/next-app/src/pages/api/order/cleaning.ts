import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

import { KaguraSDK } from "../../../../../hardhat/lib";
import { models } from "../../../../../hasura/src/sequelize";
import networks from "../../../../../shared/src/configs/networks.json";
import { ChainId } from "../../../../../shared/src/types/network";
import { OrderType, SignedOrder } from "../../../../../shared/src/types/order";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const orders = await models.Order.findAll({
    where: {
      isValid: true,
    },
  });
  for (const order of orders) {
    const { rpc } = networks[order.chainId as ChainId];
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const sdk = new KaguraSDK(provider);
    const isValid = await sdk.order.validate(order.protocol as OrderType, order.signedOrder as SignedOrder);
    if (!isValid) {
      const [updatedOrder] = await models.Order.update({ isValid }, { where: { id: order.id } });
      res.status(200).json({ updatedOrder });
    }
  }
};

export default handler;
