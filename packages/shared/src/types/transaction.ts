import { TransactionAttributes, TransactionPk } from "../../../hasura/dist/entity/transaction";

export type TransactionKey = Pick<TransactionAttributes, TransactionPk>;
