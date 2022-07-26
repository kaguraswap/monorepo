import Ajv from "ajv";
import { CreateOrderParams } from "pages/api/order/create";
import { SyncTransactionParams } from "pages/api/transaction/sync";

import { AssetKey } from "../../../../shared/src/types/asset";
import { BlockKey } from "../../../../shared/src/types/block";
import { ContractKey } from "../../../../shared/src/types/contract";
import { addFormats } from "./format";
import { schema } from "./schema";

// @dev this maybe moved to shared when sync logic move to cloud run
export const ajv = new Ajv();
addFormats(ajv);

// @dev validate is created for each table key and specific action
export const validate = {
  blockKey: ajv.compile<BlockKey>(schema.blockKey),
  contractKey: ajv.compile<ContractKey>(schema.contractKey),
  assetKey: ajv.compile<AssetKey>(schema.assetKey),
  syncTransactionParams: ajv.compile<SyncTransactionParams>(schema.syncTransactionParams),
  createOrderParams: ajv.compile<CreateOrderParams>(schema.orderCreateParams),
};
