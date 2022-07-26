import { ethers } from "ethers";
import httpError from "http-errors";
import { validate } from "lib/ajv";
import type { NextApiRequest, NextApiResponse } from "next";

import { Transaction } from "../../../../../hasura/dist/entity/transaction";
import { models, sequelize } from "../../../../../hasura/src/lib/sequelize";
import networks from "../../../../../shared/src/configs/networks.json";
import { BlockKey } from "../../../../../shared/src/types/block";
import { ChainId } from "../../../../../shared/src/types/network";
import { error } from "../../../../../shared/src/utils/error";

export const syncBlock = async (params: BlockKey) => {
  if (!validate.blockKey(params)) {
    throw httpError(error.invalidArgument.code, error.invalidArgument.message);
  }
  const { chainId, blockNumber } = params;
  const { rpc } = networks[chainId as ChainId];
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const { transactions: transactionsFromBlock } = await provider.getBlock(blockNumber);
  const { block, transactions } = await sequelize.transaction(async (t) => {
    let transactions: Transaction[] = [];
    if (transactionsFromBlock.length > 0) {
      const transactionRecords = transactionsFromBlock.map((transactionHash, transactionIndex) => {
        return { chainId, blockNumber, transactionIndex, transactionHash, isSynced: false };
      });
      transactions = await models.Transaction.bulkCreate(transactionRecords, {
        ignoreDuplicates: true,
        transaction: t,
      });
    }
    const block = await models.Block.upsert({ chainId, blockNumber, isSynced: true }, { transaction: t });
    return { block, transactions };
  });
  return { block, transactions };
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { block, transactions } = await syncBlock(req.body);
  res.status(200).json({ block, transactions });
};

export default handler;
