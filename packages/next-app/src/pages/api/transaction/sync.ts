import { ethers } from "ethers";
import { validate } from "lib/ajv";
import type { NextApiRequest, NextApiResponse } from "next";

import { Contract } from "../../../../../hasura/dist/entity/contract";
import { Log } from "../../../../../hasura/dist/entity/log";
import { models, sequelize } from "../../../../../hasura/src/lib/sequelize";
import networks from "../../../../../shared/src/configs/networks.json";
import { ChainId } from "../../../../../shared/src/types/network";
import { TransactionKey } from "../../../../../shared/src/types/transaction";
import { ERC721_TRANSFER_TOPIC } from "../../../../../shared/src/utils/constant";

export interface SyncTransactionParams extends TransactionKey {
  transactionHash: string;
}

export const syncTransaction = async (params: SyncTransactionParams) => {
  validate.syncTransactionParams(params);
  const { chainId, blockNumber, transactionIndex, transactionHash } = params;
  const { rpc } = networks[chainId as ChainId];
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const { logs: logsFromTransaction } = await provider.getTransactionReceipt(transactionHash);
  const { transaction, contracts, logs } = await sequelize.transaction(async (t) => {
    let contracts: Contract[] = [];
    let logs: Log[] = [];
    if (logsFromTransaction.length > 0) {
      /*
       * @dev this filter only supports latest erc721
       *      some old erc721's topics.length is 3 like crypto kitty
       *      but this is not targeting those old standard now
       */
      const logRecords = logsFromTransaction
        .filter(({ topics }) => topics[0] === ERC721_TRANSFER_TOPIC && topics.length === 4)
        .map(({ blockNumber, transactionIndex, address, topics, data }, logIndex) => {
          address = address.toLowerCase();
          return {
            chainId,
            blockNumber,
            transactionIndex,
            transactionHash,
            logIndex,
            address,
            topics,
            data,
            isSynced: true,
          };
        });
      const contractRecords = logRecords.map(({ chainId, address }) => {
        return { chainId, contractAddress: address };
      });
      contracts = await models.Contract.bulkCreate(contractRecords, {
        ignoreDuplicates: true,
        transaction: t,
      });
      logs = await models.Log.bulkCreate(logRecords, { ignoreDuplicates: true, transaction: t });
    }
    const transaction = await models.Transaction.upsert(
      { chainId, blockNumber, transactionIndex, transactionHash, isSynced: true },
      { transaction: t }
    );
    return { transaction, contracts, logs };
  });
  return { transaction, contracts, logs };
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { transaction, contracts, logs } = await syncTransaction(req.body);
  res.status(200).json({ transaction, contracts, logs });
};

export default handler;
