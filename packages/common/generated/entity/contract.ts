import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { nft, nftId } from './nft';

export interface contractAttributes {
  chainId: string;
  contractAddress: string;
  supportsInterface: object;
  tokenUri?: string;
}

export type contractPk = "chainId" | "contractAddress";
export type contractId = contract[contractPk];
export type contractOptionalAttributes = "tokenUri";
export type contractCreationAttributes = Optional<contractAttributes, contractOptionalAttributes>;

export class contract extends Model<contractAttributes, contractCreationAttributes> implements contractAttributes {
  chainId!: string;
  contractAddress!: string;
  supportsInterface!: object;
  tokenUri?: string;

  // contract belongsToMany contract via chainId and contractAddress
  contractAddressContracts!: contract[];
  getContractAddressContracts!: Sequelize.BelongsToManyGetAssociationsMixin<contract>;
  setContractAddressContracts!: Sequelize.BelongsToManySetAssociationsMixin<contract, contractId>;
  addContractAddressContract!: Sequelize.BelongsToManyAddAssociationMixin<contract, contractId>;
  addContractAddressContracts!: Sequelize.BelongsToManyAddAssociationsMixin<contract, contractId>;
  createContractAddressContract!: Sequelize.BelongsToManyCreateAssociationMixin<contract>;
  removeContractAddressContract!: Sequelize.BelongsToManyRemoveAssociationMixin<contract, contractId>;
  removeContractAddressContracts!: Sequelize.BelongsToManyRemoveAssociationsMixin<contract, contractId>;
  hasContractAddressContract!: Sequelize.BelongsToManyHasAssociationMixin<contract, contractId>;
  hasContractAddressContracts!: Sequelize.BelongsToManyHasAssociationsMixin<contract, contractId>;
  countContractAddressContracts!: Sequelize.BelongsToManyCountAssociationsMixin;
  // contract belongsToMany contract via contractAddress and chainId
  chainIdContracts!: contract[];
  getChainIdContracts!: Sequelize.BelongsToManyGetAssociationsMixin<contract>;
  setChainIdContracts!: Sequelize.BelongsToManySetAssociationsMixin<contract, contractId>;
  addChainIdContract!: Sequelize.BelongsToManyAddAssociationMixin<contract, contractId>;
  addChainIdContracts!: Sequelize.BelongsToManyAddAssociationsMixin<contract, contractId>;
  createChainIdContract!: Sequelize.BelongsToManyCreateAssociationMixin<contract>;
  removeChainIdContract!: Sequelize.BelongsToManyRemoveAssociationMixin<contract, contractId>;
  removeChainIdContracts!: Sequelize.BelongsToManyRemoveAssociationsMixin<contract, contractId>;
  hasChainIdContract!: Sequelize.BelongsToManyHasAssociationMixin<contract, contractId>;
  hasChainIdContracts!: Sequelize.BelongsToManyHasAssociationsMixin<contract, contractId>;
  countChainIdContracts!: Sequelize.BelongsToManyCountAssociationsMixin;
  // contract hasMany nft via chainId
  nfts!: nft[];
  getNfts!: Sequelize.HasManyGetAssociationsMixin<nft>;
  setNfts!: Sequelize.HasManySetAssociationsMixin<nft, nftId>;
  addNft!: Sequelize.HasManyAddAssociationMixin<nft, nftId>;
  addNfts!: Sequelize.HasManyAddAssociationsMixin<nft, nftId>;
  createNft!: Sequelize.HasManyCreateAssociationMixin<nft>;
  removeNft!: Sequelize.HasManyRemoveAssociationMixin<nft, nftId>;
  removeNfts!: Sequelize.HasManyRemoveAssociationsMixin<nft, nftId>;
  hasNft!: Sequelize.HasManyHasAssociationMixin<nft, nftId>;
  hasNfts!: Sequelize.HasManyHasAssociationsMixin<nft, nftId>;
  countNfts!: Sequelize.HasManyCountAssociationsMixin;
  // contract hasMany nft via contractAddress
  contractAddressNfts!: nft[];
  getContractAddressNfts!: Sequelize.HasManyGetAssociationsMixin<nft>;
  setContractAddressNfts!: Sequelize.HasManySetAssociationsMixin<nft, nftId>;
  addContractAddressNft!: Sequelize.HasManyAddAssociationMixin<nft, nftId>;
  addContractAddressNfts!: Sequelize.HasManyAddAssociationsMixin<nft, nftId>;
  createContractAddressNft!: Sequelize.HasManyCreateAssociationMixin<nft>;
  removeContractAddressNft!: Sequelize.HasManyRemoveAssociationMixin<nft, nftId>;
  removeContractAddressNfts!: Sequelize.HasManyRemoveAssociationsMixin<nft, nftId>;
  hasContractAddressNft!: Sequelize.HasManyHasAssociationMixin<nft, nftId>;
  hasContractAddressNfts!: Sequelize.HasManyHasAssociationsMixin<nft, nftId>;
  countContractAddressNfts!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof contract {
    return contract.init({
    chainId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    contractAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    supportsInterface: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    tokenUri: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'tokenURI'
    }
  }, {
    sequelize,
    tableName: 'contract',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "contract_pkey",
        unique: true,
        fields: [
          { name: "chainId" },
          { name: "contractAddress" },
        ]
      },
    ]
  });
  }
}
