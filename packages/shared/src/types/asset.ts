import { AssetAttributes, AssetPk } from "../../../hasura/dist/entity/asset";
import { ChainId } from "./network";

export interface AssetKey extends Pick<AssetAttributes, AssetPk> {
  chainId: ChainId;
}
