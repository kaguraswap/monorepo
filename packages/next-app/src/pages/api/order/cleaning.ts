import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

import { KaguraSDK } from "../../../../../hardhat/lib";
import { SignedOrder } from "../../../../../hardhat/types/order";
import { OrderProtocol_Enum } from "../../../../../hasura/dist/graphql";
import { models } from "../../../../../hasura/src/lib/sequelize";
import networks from "../../../../../shared/src/configs/networks.json";
import { ChainId } from "../../../../../shared/src/types/network";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const orders = await models.Order.findAll({
    where: {
      isValid: true,
    },
  });
  for (const order of orders) {
    const { rpc } = networks[<ChainId>order.chainId];
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const sdk = new KaguraSDK(provider);
    const isValid = await sdk.order.validate(<OrderProtocol_Enum>order.protocol, <SignedOrder>order.signedOrder);
    if (!isValid) {
      models.Order.update({ isValid }, { where: { id: order.id } });
    }
  }
  res.status(200).json("ok");
};

export default handler;
