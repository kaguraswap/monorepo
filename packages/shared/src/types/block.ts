import { BlockAttributes, BlockPk } from "../../../hasura/dist/entity/block";

export type BlockKey = Pick<BlockAttributes, BlockPk>;
