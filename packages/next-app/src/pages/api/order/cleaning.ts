import { ethers } from "ethers";
import { models } from "lib/sequelize";
import type { NextApiRequest, NextApiResponse } from "next";

import networks from "../../../../../common/configs/networks.json";
import { ChainId } from "../../../../../common/types/network";
import { OrderType, SignedOrder } from "../../../../../common/types/order";
import { KaguraSDK } from "../../../../../hardhat/lib";

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
