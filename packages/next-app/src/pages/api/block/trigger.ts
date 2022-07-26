import httpError from "http-errors";
import { validate } from "lib/ajv";
import type { NextApiRequest, NextApiResponse } from "next";

import { models, sequelize } from "../../../../../hasura/src/lib/sequelize";
import { BlockKey } from "../../../../../shared/src/types/block";
import { error } from "../../../../../shared/src/utils/error";

// TODO: automate trigger
export const blockTrigger = async (params: BlockKey) => {
  if (!validate.blockKey(params)) {
    throw httpError(error.invalidArgument.code, error.invalidArgument.message);
  }

  const { chainId, blockNumber } = params;
  const { block } = await sequelize.transaction(async (t) => {
    const blockRecords = { chainId, blockNumber };
    const block = await models.Block.upsert(blockRecords, { transaction: t });
    return { block };
  });
  return { block };
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { block } = await blockTrigger(req.body);
  res.status(200).json({ block });
};

export default handler;
