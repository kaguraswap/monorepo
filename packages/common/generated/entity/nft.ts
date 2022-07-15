import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { contract, contractId } from './contract';
import type { order, orderId } from './order';

export interface nftAttributes {
  chainId: string;
  contractAddress: string;
  tokenId: string;
  holder: string;
  metadata: object;
}

export type nftPk = "chainId" | "contractAddress" | "tokenId";
export type nftId = nft[nftPk];
export type nftCreationAttributes = nftAttributes;

export class nft extends Model<nftAttributes, nftCreationAttributes> implements nftAttributes {
  chainId!: string;
  contractAddress!: string;
  tokenId!: string;
  holder!: string;
  metadata!: object;

  // nft belongsTo contract via chainId
  chain!: contract;
  getChain!: Sequelize.BelongsToGetAssociationMixin<contract>;
  setChain!: Sequelize.BelongsToSetAssociationMixin<contract, contractId>;
  createChain!: Sequelize.BelongsToCreateAssociationMixin<contract>;
  // nft belongsTo contract via contractAddress
  contractAddressContract!: contract;
  getContractAddressContract!: Sequelize.BelongsToGetAssociationMixin<contract>;
  setContractAddressContract!: Sequelize.BelongsToSetAssociationMixin<contract, contractId>;
  createContractAddressContract!: Sequelize.BelongsToCreateAssociationMixin<contract>;
  // nft hasMany order via chainId
  orders!: order[];
  getOrders!: Sequelize.HasManyGetAssociationsMixin<order>;
  setOrders!: Sequelize.HasManySetAssociationsMixin<order, orderId>;
  addOrder!: Sequelize.HasManyAddAssociationMixin<order, orderId>;
  addOrders!: Sequelize.HasManyAddAssociationsMixin<order, orderId>;
  createOrder!: Sequelize.HasManyCreateAssociationMixin<order>;
  removeOrder!: Sequelize.HasManyRemoveAssociationMixin<order, orderId>;
  removeOrders!: Sequelize.HasManyRemoveAssociationsMixin<order, orderId>;
  hasOrder!: Sequelize.HasManyHasAssociationMixin<order, orderId>;
  hasOrders!: Sequelize.HasManyHasAssociationsMixin<order, orderId>;
  countOrders!: Sequelize.HasManyCountAssociationsMixin;
  // nft hasMany order via contractAddress
  contractAddressOrders!: order[];
  getContractAddressOrders!: Sequelize.HasManyGetAssociationsMixin<order>;
  setContractAddressOrders!: Sequelize.HasManySetAssociationsMixin<order, orderId>;
  addContractAddressOrder!: Sequelize.HasManyAddAssociationMixin<order, orderId>;
  addContractAddressOrders!: Sequelize.HasManyAddAssociationsMixin<order, orderId>;
  createContractAddressOrder!: Sequelize.HasManyCreateAssociationMixin<order>;
  removeContractAddressOrder!: Sequelize.HasManyRemoveAssociationMixin<order, orderId>;
  removeContractAddressOrders!: Sequelize.HasManyRemoveAssociationsMixin<order, orderId>;
  hasContractAddressOrder!: Sequelize.HasManyHasAssociationMixin<order, orderId>;
  hasContractAddressOrders!: Sequelize.HasManyHasAssociationsMixin<order, orderId>;
  countContractAddressOrders!: Sequelize.HasManyCountAssociationsMixin;
  // nft hasMany order via tokenId
  tokenOrders!: order[];
  getTokenOrders!: Sequelize.HasManyGetAssociationsMixin<order>;
  setTokenOrders!: Sequelize.HasManySetAssociationsMixin<order, orderId>;
  addTokenOrder!: Sequelize.HasManyAddAssociationMixin<order, orderId>;
  addTokenOrders!: Sequelize.HasManyAddAssociationsMixin<order, orderId>;
  createTokenOrder!: Sequelize.HasManyCreateAssociationMixin<order>;
  removeTokenOrder!: Sequelize.HasManyRemoveAssociationMixin<order, orderId>;
  removeTokenOrders!: Sequelize.HasManyRemoveAssociationsMixin<order, orderId>;
  hasTokenOrder!: Sequelize.HasManyHasAssociationMixin<order, orderId>;
  hasTokenOrders!: Sequelize.HasManyHasAssociationsMixin<order, orderId>;
  countTokenOrders!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof nft {
    return nft.init({
    chainId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'contract',
        key: 'contractAddress'
      }
    },
    contractAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'contract',
        key: 'contractAddress'
      }
    },
    tokenId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    holder: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'nft',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "nft_pkey",
        unique: true,
        fields: [
          { name: "chainId" },
          { name: "contractAddress" },
          { name: "tokenId" },
        ]
      },
    ]
  });
  }
}
