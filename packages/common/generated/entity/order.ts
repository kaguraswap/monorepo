import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { nft, nftId } from "./nft";

export interface orderAttributes {
  id: string;
  chainId: string;
  contractAddress: string;
  tokenId: string;
  type: string;
  isValid: boolean;
  signedOrder: object;
}

export type orderPk = "id";
export type orderId = order[orderPk];
export type orderCreationAttributes = orderAttributes;

export class order extends Model<orderAttributes, orderCreationAttributes> implements orderAttributes {
  id!: string;
  chainId!: string;
  contractAddress!: string;
  tokenId!: string;
  type!: string;
  isValid!: boolean;
  signedOrder!: object;

  // order belongsTo nft via chainId
  chain!: nft;
  getChain!: Sequelize.BelongsToGetAssociationMixin<nft>;
  setChain!: Sequelize.BelongsToSetAssociationMixin<nft, nftId>;
  createChain!: Sequelize.BelongsToCreateAssociationMixin<nft>;
  // order belongsTo nft via contractAddress
  contractAddressNft!: nft;
  getContractAddressNft!: Sequelize.BelongsToGetAssociationMixin<nft>;
  setContractAddressNft!: Sequelize.BelongsToSetAssociationMixin<nft, nftId>;
  createContractAddressNft!: Sequelize.BelongsToCreateAssociationMixin<nft>;
  // order belongsTo nft via tokenId
  token!: nft;
  getToken!: Sequelize.BelongsToGetAssociationMixin<nft>;
  setToken!: Sequelize.BelongsToSetAssociationMixin<nft, nftId>;
  createToken!: Sequelize.BelongsToCreateAssociationMixin<nft>;

  static initModel(sequelize: Sequelize.Sequelize): typeof order {
    return order.init(
      {
        id: {
          type: DataTypes.TEXT,
          allowNull: false,
          primaryKey: true,
        },
        chainId: {
          type: DataTypes.TEXT,
          allowNull: false,
          references: {
            model: "nft",
            key: "tokenId",
          },
        },
        contractAddress: {
          type: DataTypes.TEXT,
          allowNull: false,
          references: {
            model: "nft",
            key: "tokenId",
          },
        },
        tokenId: {
          type: DataTypes.TEXT,
          allowNull: false,
          references: {
            model: "nft",
            key: "tokenId",
          },
        },
        type: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        isValid: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        signedOrder: {
          type: DataTypes.JSONB,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "order",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "order_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
