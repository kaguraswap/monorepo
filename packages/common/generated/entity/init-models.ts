import type { Sequelize } from "sequelize";
import { contract as _contract } from "./contract";
import type { contractAttributes, contractCreationAttributes } from "./contract";
import { nft as _nft } from "./nft";
import type { nftAttributes, nftCreationAttributes } from "./nft";
import { order as _order } from "./order";
import type { orderAttributes, orderCreationAttributes } from "./order";

export {
  _contract as contract,
  _nft as nft,
  _order as order,
};

export type {
  contractAttributes,
  contractCreationAttributes,
  nftAttributes,
  nftCreationAttributes,
  orderAttributes,
  orderCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const contract = _contract.initModel(sequelize);
  const nft = _nft.initModel(sequelize);
  const order = _order.initModel(sequelize);

  contract.belongsToMany(contract, { as: 'contractAddressContracts', through: nft, foreignKey: "chainId", otherKey: "contractAddress" });
  contract.belongsToMany(contract, { as: 'chainIdContracts', through: nft, foreignKey: "contractAddress", otherKey: "chainId" });
  nft.belongsTo(contract, { as: "chain", foreignKey: "chainId"});
  contract.hasMany(nft, { as: "nfts", foreignKey: "chainId"});
  nft.belongsTo(contract, { as: "contractAddressContract", foreignKey: "contractAddress"});
  contract.hasMany(nft, { as: "contractAddressNfts", foreignKey: "contractAddress"});
  order.belongsTo(nft, { as: "chain", foreignKey: "chainId"});
  nft.hasMany(order, { as: "orders", foreignKey: "chainId"});
  order.belongsTo(nft, { as: "contractAddressNft", foreignKey: "contractAddress"});
  nft.hasMany(order, { as: "contractAddressOrders", foreignKey: "contractAddress"});
  order.belongsTo(nft, { as: "token", foreignKey: "tokenId"});
  nft.hasMany(order, { as: "tokenOrders", foreignKey: "tokenId"});

  return {
    contract: contract,
    nft: nft,
    order: order,
  };
}
