import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  jsonb: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["Boolean"]>;
  _gt?: InputMaybe<Scalars["Boolean"]>;
  _gte?: InputMaybe<Scalars["Boolean"]>;
  _in?: InputMaybe<Array<Scalars["Boolean"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["Boolean"]>;
  _lte?: InputMaybe<Scalars["Boolean"]>;
  _neq?: InputMaybe<Scalars["Boolean"]>;
  _nin?: InputMaybe<Array<Scalars["Boolean"]>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["String"]>;
  _gt?: InputMaybe<Scalars["String"]>;
  _gte?: InputMaybe<Scalars["String"]>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars["String"]>;
  _in?: InputMaybe<Array<Scalars["String"]>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars["String"]>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars["String"]>;
  _lt?: InputMaybe<Scalars["String"]>;
  _lte?: InputMaybe<Scalars["String"]>;
  _neq?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars["String"]>;
  _nin?: InputMaybe<Array<Scalars["String"]>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars["String"]>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars["String"]>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars["String"]>;
};

/** columns and relationships of "contract" */
export type Contract = {
  __typename?: "contract";
  chainId: Scalars["String"];
  contractAddress: Scalars["String"];
  /** An array relationship */
  nfts: Array<Nft>;
  /** An aggregate relationship */
  nfts_aggregate: Nft_Aggregate;
  supportsInterface: Scalars["jsonb"];
  tokenURI?: Maybe<Scalars["String"]>;
};

/** columns and relationships of "contract" */
export type ContractNftsArgs = {
  distinct_on?: InputMaybe<Array<Nft_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Nft_Order_By>>;
  where?: InputMaybe<Nft_Bool_Exp>;
};

/** columns and relationships of "contract" */
export type ContractNfts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Nft_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Nft_Order_By>>;
  where?: InputMaybe<Nft_Bool_Exp>;
};

/** columns and relationships of "contract" */
export type ContractSupportsInterfaceArgs = {
  path?: InputMaybe<Scalars["String"]>;
};

/** aggregated selection of "contract" */
export type Contract_Aggregate = {
  __typename?: "contract_aggregate";
  aggregate?: Maybe<Contract_Aggregate_Fields>;
  nodes: Array<Contract>;
};

/** aggregate fields of "contract" */
export type Contract_Aggregate_Fields = {
  __typename?: "contract_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Contract_Max_Fields>;
  min?: Maybe<Contract_Min_Fields>;
};

/** aggregate fields of "contract" */
export type Contract_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contract_Select_Column>>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Contract_Append_Input = {
  supportsInterface?: InputMaybe<Scalars["jsonb"]>;
};

/** Boolean expression to filter rows from the table "contract". All fields are combined with a logical 'AND'. */
export type Contract_Bool_Exp = {
  _and?: InputMaybe<Array<Contract_Bool_Exp>>;
  _not?: InputMaybe<Contract_Bool_Exp>;
  _or?: InputMaybe<Array<Contract_Bool_Exp>>;
  chainId?: InputMaybe<String_Comparison_Exp>;
  contractAddress?: InputMaybe<String_Comparison_Exp>;
  nfts?: InputMaybe<Nft_Bool_Exp>;
  supportsInterface?: InputMaybe<Jsonb_Comparison_Exp>;
  tokenURI?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "contract" */
export enum Contract_Constraint {
  /** unique or primary key constraint on columns "contractAddress", "chainId" */
  ContractPkey = "contract_pkey",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Contract_Delete_At_Path_Input = {
  supportsInterface?: InputMaybe<Array<Scalars["String"]>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Contract_Delete_Elem_Input = {
  supportsInterface?: InputMaybe<Scalars["Int"]>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Contract_Delete_Key_Input = {
  supportsInterface?: InputMaybe<Scalars["String"]>;
};

/** input type for inserting data into table "contract" */
export type Contract_Insert_Input = {
  chainId?: InputMaybe<Scalars["String"]>;
  contractAddress?: InputMaybe<Scalars["String"]>;
  nfts?: InputMaybe<Nft_Arr_Rel_Insert_Input>;
  supportsInterface?: InputMaybe<Scalars["jsonb"]>;
  tokenURI?: InputMaybe<Scalars["String"]>;
};

/** aggregate max on columns */
export type Contract_Max_Fields = {
  __typename?: "contract_max_fields";
  chainId?: Maybe<Scalars["String"]>;
  contractAddress?: Maybe<Scalars["String"]>;
  tokenURI?: Maybe<Scalars["String"]>;
};

/** aggregate min on columns */
export type Contract_Min_Fields = {
  __typename?: "contract_min_fields";
  chainId?: Maybe<Scalars["String"]>;
  contractAddress?: Maybe<Scalars["String"]>;
  tokenURI?: Maybe<Scalars["String"]>;
};

/** response of any mutation on the table "contract" */
export type Contract_Mutation_Response = {
  __typename?: "contract_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Array<Contract>;
};

/** input type for inserting object relation for remote table "contract" */
export type Contract_Obj_Rel_Insert_Input = {
  data: Contract_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Contract_On_Conflict>;
};

/** on_conflict condition type for table "contract" */
export type Contract_On_Conflict = {
  constraint: Contract_Constraint;
  update_columns?: Array<Contract_Update_Column>;
  where?: InputMaybe<Contract_Bool_Exp>;
};

/** Ordering options when selecting data from "contract". */
export type Contract_Order_By = {
  chainId?: InputMaybe<Order_By>;
  contractAddress?: InputMaybe<Order_By>;
  nfts_aggregate?: InputMaybe<Nft_Aggregate_Order_By>;
  supportsInterface?: InputMaybe<Order_By>;
  tokenURI?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contract */
export type Contract_Pk_Columns_Input = {
  chainId: Scalars["String"];
  contractAddress: Scalars["String"];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Contract_Prepend_Input = {
  supportsInterface?: InputMaybe<Scalars["jsonb"]>;
};

/** select columns of table "contract" */
export enum Contract_Select_Column {
  /** column name */
  ChainId = "chainId",
  /** column name */
  ContractAddress = "contractAddress",
  /** column name */
  SupportsInterface = "supportsInterface",
  /** column name */
  TokenUri = "tokenURI",
}

/** input type for updating data in table "contract" */
export type Contract_Set_Input = {
  chainId?: InputMaybe<Scalars["String"]>;
  contractAddress?: InputMaybe<Scalars["String"]>;
  supportsInterface?: InputMaybe<Scalars["jsonb"]>;
  tokenURI?: InputMaybe<Scalars["String"]>;
};

/** update columns of table "contract" */
export enum Contract_Update_Column {
  /** column name */
  ChainId = "chainId",
  /** column name */
  ContractAddress = "contractAddress",
  /** column name */
  SupportsInterface = "supportsInterface",
  /** column name */
  TokenUri = "tokenURI",
}

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars["jsonb"]>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars["jsonb"]>;
  _eq?: InputMaybe<Scalars["jsonb"]>;
  _gt?: InputMaybe<Scalars["jsonb"]>;
  _gte?: InputMaybe<Scalars["jsonb"]>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars["String"]>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars["String"]>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars["String"]>>;
  _in?: InputMaybe<Array<Scalars["jsonb"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["jsonb"]>;
  _lte?: InputMaybe<Scalars["jsonb"]>;
  _neq?: InputMaybe<Scalars["jsonb"]>;
  _nin?: InputMaybe<Array<Scalars["jsonb"]>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: "mutation_root";
  /** delete data from the table: "contract" */
  delete_contract?: Maybe<Contract_Mutation_Response>;
  /** delete single row from the table: "contract" */
  delete_contract_by_pk?: Maybe<Contract>;
  /** delete data from the table: "nft" */
  delete_nft?: Maybe<Nft_Mutation_Response>;
  /** delete single row from the table: "nft" */
  delete_nft_by_pk?: Maybe<Nft>;
  /** delete data from the table: "order" */
  delete_order?: Maybe<Order_Mutation_Response>;
  /** delete single row from the table: "order" */
  delete_order_by_pk?: Maybe<Order>;
  /** insert data into the table: "contract" */
  insert_contract?: Maybe<Contract_Mutation_Response>;
  /** insert a single row into the table: "contract" */
  insert_contract_one?: Maybe<Contract>;
  /** insert data into the table: "nft" */
  insert_nft?: Maybe<Nft_Mutation_Response>;
  /** insert a single row into the table: "nft" */
  insert_nft_one?: Maybe<Nft>;
  /** insert data into the table: "order" */
  insert_order?: Maybe<Order_Mutation_Response>;
  /** insert a single row into the table: "order" */
  insert_order_one?: Maybe<Order>;
  /** update data of the table: "contract" */
  update_contract?: Maybe<Contract_Mutation_Response>;
  /** update single row of the table: "contract" */
  update_contract_by_pk?: Maybe<Contract>;
  /** update data of the table: "nft" */
  update_nft?: Maybe<Nft_Mutation_Response>;
  /** update single row of the table: "nft" */
  update_nft_by_pk?: Maybe<Nft>;
  /** update data of the table: "order" */
  update_order?: Maybe<Order_Mutation_Response>;
  /** update single row of the table: "order" */
  update_order_by_pk?: Maybe<Order>;
};

/** mutation root */
export type Mutation_RootDelete_ContractArgs = {
  where: Contract_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Contract_By_PkArgs = {
  chainId: Scalars["String"];
  contractAddress: Scalars["String"];
};

/** mutation root */
export type Mutation_RootDelete_NftArgs = {
  where: Nft_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Nft_By_PkArgs = {
  chainId: Scalars["String"];
  contractAddress: Scalars["String"];
  tokenId: Scalars["String"];
};

/** mutation root */
export type Mutation_RootDelete_OrderArgs = {
  where: Order_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Order_By_PkArgs = {
  id: Scalars["String"];
};

/** mutation root */
export type Mutation_RootInsert_ContractArgs = {
  objects: Array<Contract_Insert_Input>;
  on_conflict?: InputMaybe<Contract_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Contract_OneArgs = {
  object: Contract_Insert_Input;
  on_conflict?: InputMaybe<Contract_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_NftArgs = {
  objects: Array<Nft_Insert_Input>;
  on_conflict?: InputMaybe<Nft_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Nft_OneArgs = {
  object: Nft_Insert_Input;
  on_conflict?: InputMaybe<Nft_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_OrderArgs = {
  objects: Array<Order_Insert_Input>;
  on_conflict?: InputMaybe<Order_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Order_OneArgs = {
  object: Order_Insert_Input;
  on_conflict?: InputMaybe<Order_On_Conflict>;
};

/** mutation root */
export type Mutation_RootUpdate_ContractArgs = {
  _append?: InputMaybe<Contract_Append_Input>;
  _delete_at_path?: InputMaybe<Contract_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Contract_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Contract_Delete_Key_Input>;
  _prepend?: InputMaybe<Contract_Prepend_Input>;
  _set?: InputMaybe<Contract_Set_Input>;
  where: Contract_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Contract_By_PkArgs = {
  _append?: InputMaybe<Contract_Append_Input>;
  _delete_at_path?: InputMaybe<Contract_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Contract_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Contract_Delete_Key_Input>;
  _prepend?: InputMaybe<Contract_Prepend_Input>;
  _set?: InputMaybe<Contract_Set_Input>;
  pk_columns: Contract_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_NftArgs = {
  _append?: InputMaybe<Nft_Append_Input>;
  _delete_at_path?: InputMaybe<Nft_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Nft_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Nft_Delete_Key_Input>;
  _prepend?: InputMaybe<Nft_Prepend_Input>;
  _set?: InputMaybe<Nft_Set_Input>;
  where: Nft_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Nft_By_PkArgs = {
  _append?: InputMaybe<Nft_Append_Input>;
  _delete_at_path?: InputMaybe<Nft_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Nft_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Nft_Delete_Key_Input>;
  _prepend?: InputMaybe<Nft_Prepend_Input>;
  _set?: InputMaybe<Nft_Set_Input>;
  pk_columns: Nft_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_OrderArgs = {
  _append?: InputMaybe<Order_Append_Input>;
  _delete_at_path?: InputMaybe<Order_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Order_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Order_Delete_Key_Input>;
  _prepend?: InputMaybe<Order_Prepend_Input>;
  _set?: InputMaybe<Order_Set_Input>;
  where: Order_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Order_By_PkArgs = {
  _append?: InputMaybe<Order_Append_Input>;
  _delete_at_path?: InputMaybe<Order_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Order_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Order_Delete_Key_Input>;
  _prepend?: InputMaybe<Order_Prepend_Input>;
  _set?: InputMaybe<Order_Set_Input>;
  pk_columns: Order_Pk_Columns_Input;
};

/** columns and relationships of "nft" */
export type Nft = {
  __typename?: "nft";
  chainId: Scalars["String"];
  /** An object relationship */
  contract?: Maybe<Contract>;
  contractAddress: Scalars["String"];
  holder: Scalars["String"];
  metadata: Scalars["jsonb"];
  /** An array relationship */
  orders: Array<Order>;
  /** An aggregate relationship */
  orders_aggregate: Order_Aggregate;
  tokenId: Scalars["String"];
};

/** columns and relationships of "nft" */
export type NftMetadataArgs = {
  path?: InputMaybe<Scalars["String"]>;
};

/** columns and relationships of "nft" */
export type NftOrdersArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};

/** columns and relationships of "nft" */
export type NftOrders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};

/** aggregated selection of "nft" */
export type Nft_Aggregate = {
  __typename?: "nft_aggregate";
  aggregate?: Maybe<Nft_Aggregate_Fields>;
  nodes: Array<Nft>;
};

/** aggregate fields of "nft" */
export type Nft_Aggregate_Fields = {
  __typename?: "nft_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Nft_Max_Fields>;
  min?: Maybe<Nft_Min_Fields>;
};

/** aggregate fields of "nft" */
export type Nft_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Nft_Select_Column>>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "nft" */
export type Nft_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Nft_Max_Order_By>;
  min?: InputMaybe<Nft_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Nft_Append_Input = {
  metadata?: InputMaybe<Scalars["jsonb"]>;
};

/** input type for inserting array relation for remote table "nft" */
export type Nft_Arr_Rel_Insert_Input = {
  data: Array<Nft_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Nft_On_Conflict>;
};

/** Boolean expression to filter rows from the table "nft". All fields are combined with a logical 'AND'. */
export type Nft_Bool_Exp = {
  _and?: InputMaybe<Array<Nft_Bool_Exp>>;
  _not?: InputMaybe<Nft_Bool_Exp>;
  _or?: InputMaybe<Array<Nft_Bool_Exp>>;
  chainId?: InputMaybe<String_Comparison_Exp>;
  contract?: InputMaybe<Contract_Bool_Exp>;
  contractAddress?: InputMaybe<String_Comparison_Exp>;
  holder?: InputMaybe<String_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  orders?: InputMaybe<Order_Bool_Exp>;
  tokenId?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "nft" */
export enum Nft_Constraint {
  /** unique or primary key constraint on columns "contractAddress", "chainId", "tokenId" */
  NftPkey = "nft_pkey",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Nft_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars["String"]>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Nft_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars["Int"]>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Nft_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars["String"]>;
};

/** input type for inserting data into table "nft" */
export type Nft_Insert_Input = {
  chainId?: InputMaybe<Scalars["String"]>;
  contract?: InputMaybe<Contract_Obj_Rel_Insert_Input>;
  contractAddress?: InputMaybe<Scalars["String"]>;
  holder?: InputMaybe<Scalars["String"]>;
  metadata?: InputMaybe<Scalars["jsonb"]>;
  orders?: InputMaybe<Order_Arr_Rel_Insert_Input>;
  tokenId?: InputMaybe<Scalars["String"]>;
};

/** aggregate max on columns */
export type Nft_Max_Fields = {
  __typename?: "nft_max_fields";
  chainId?: Maybe<Scalars["String"]>;
  contractAddress?: Maybe<Scalars["String"]>;
  holder?: Maybe<Scalars["String"]>;
  tokenId?: Maybe<Scalars["String"]>;
};

/** order by max() on columns of table "nft" */
export type Nft_Max_Order_By = {
  chainId?: InputMaybe<Order_By>;
  contractAddress?: InputMaybe<Order_By>;
  holder?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Nft_Min_Fields = {
  __typename?: "nft_min_fields";
  chainId?: Maybe<Scalars["String"]>;
  contractAddress?: Maybe<Scalars["String"]>;
  holder?: Maybe<Scalars["String"]>;
  tokenId?: Maybe<Scalars["String"]>;
};

/** order by min() on columns of table "nft" */
export type Nft_Min_Order_By = {
  chainId?: InputMaybe<Order_By>;
  contractAddress?: InputMaybe<Order_By>;
  holder?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "nft" */
export type Nft_Mutation_Response = {
  __typename?: "nft_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Array<Nft>;
};

/** input type for inserting object relation for remote table "nft" */
export type Nft_Obj_Rel_Insert_Input = {
  data: Nft_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Nft_On_Conflict>;
};

/** on_conflict condition type for table "nft" */
export type Nft_On_Conflict = {
  constraint: Nft_Constraint;
  update_columns?: Array<Nft_Update_Column>;
  where?: InputMaybe<Nft_Bool_Exp>;
};

/** Ordering options when selecting data from "nft". */
export type Nft_Order_By = {
  chainId?: InputMaybe<Order_By>;
  contract?: InputMaybe<Contract_Order_By>;
  contractAddress?: InputMaybe<Order_By>;
  holder?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  orders_aggregate?: InputMaybe<Order_Aggregate_Order_By>;
  tokenId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: nft */
export type Nft_Pk_Columns_Input = {
  chainId: Scalars["String"];
  contractAddress: Scalars["String"];
  tokenId: Scalars["String"];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Nft_Prepend_Input = {
  metadata?: InputMaybe<Scalars["jsonb"]>;
};

/** select columns of table "nft" */
export enum Nft_Select_Column {
  /** column name */
  ChainId = "chainId",
  /** column name */
  ContractAddress = "contractAddress",
  /** column name */
  Holder = "holder",
  /** column name */
  Metadata = "metadata",
  /** column name */
  TokenId = "tokenId",
}

/** input type for updating data in table "nft" */
export type Nft_Set_Input = {
  chainId?: InputMaybe<Scalars["String"]>;
  contractAddress?: InputMaybe<Scalars["String"]>;
  holder?: InputMaybe<Scalars["String"]>;
  metadata?: InputMaybe<Scalars["jsonb"]>;
  tokenId?: InputMaybe<Scalars["String"]>;
};

/** update columns of table "nft" */
export enum Nft_Update_Column {
  /** column name */
  ChainId = "chainId",
  /** column name */
  ContractAddress = "contractAddress",
  /** column name */
  Holder = "holder",
  /** column name */
  Metadata = "metadata",
  /** column name */
  TokenId = "tokenId",
}

/** columns and relationships of "order" */
export type Order = {
  __typename?: "order";
  chainId: Scalars["String"];
  contractAddress: Scalars["String"];
  id: Scalars["String"];
  isValid: Scalars["Boolean"];
  /** An object relationship */
  nft?: Maybe<Nft>;
  signedOrder: Scalars["jsonb"];
  tokenId: Scalars["String"];
  type: Scalars["String"];
};

/** columns and relationships of "order" */
export type OrderSignedOrderArgs = {
  path?: InputMaybe<Scalars["String"]>;
};

/** aggregated selection of "order" */
export type Order_Aggregate = {
  __typename?: "order_aggregate";
  aggregate?: Maybe<Order_Aggregate_Fields>;
  nodes: Array<Order>;
};

/** aggregate fields of "order" */
export type Order_Aggregate_Fields = {
  __typename?: "order_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Order_Max_Fields>;
  min?: Maybe<Order_Min_Fields>;
};

/** aggregate fields of "order" */
export type Order_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Select_Column>>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "order" */
export type Order_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_Max_Order_By>;
  min?: InputMaybe<Order_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Order_Append_Input = {
  signedOrder?: InputMaybe<Scalars["jsonb"]>;
};

/** input type for inserting array relation for remote table "order" */
export type Order_Arr_Rel_Insert_Input = {
  data: Array<Order_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Order_On_Conflict>;
};

/** Boolean expression to filter rows from the table "order". All fields are combined with a logical 'AND'. */
export type Order_Bool_Exp = {
  _and?: InputMaybe<Array<Order_Bool_Exp>>;
  _not?: InputMaybe<Order_Bool_Exp>;
  _or?: InputMaybe<Array<Order_Bool_Exp>>;
  chainId?: InputMaybe<String_Comparison_Exp>;
  contractAddress?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  isValid?: InputMaybe<Boolean_Comparison_Exp>;
  nft?: InputMaybe<Nft_Bool_Exp>;
  signedOrder?: InputMaybe<Jsonb_Comparison_Exp>;
  tokenId?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = "asc",
  /** in ascending order, nulls first */
  AscNullsFirst = "asc_nulls_first",
  /** in ascending order, nulls last */
  AscNullsLast = "asc_nulls_last",
  /** in descending order, nulls first */
  Desc = "desc",
  /** in descending order, nulls first */
  DescNullsFirst = "desc_nulls_first",
  /** in descending order, nulls last */
  DescNullsLast = "desc_nulls_last",
}

/** unique or primary key constraints on table "order" */
export enum Order_Constraint {
  /** unique or primary key constraint on columns "id" */
  OrderPkey = "order_pkey",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Order_Delete_At_Path_Input = {
  signedOrder?: InputMaybe<Array<Scalars["String"]>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Order_Delete_Elem_Input = {
  signedOrder?: InputMaybe<Scalars["Int"]>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Order_Delete_Key_Input = {
  signedOrder?: InputMaybe<Scalars["String"]>;
};

/** input type for inserting data into table "order" */
export type Order_Insert_Input = {
  chainId?: InputMaybe<Scalars["String"]>;
  contractAddress?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  isValid?: InputMaybe<Scalars["Boolean"]>;
  nft?: InputMaybe<Nft_Obj_Rel_Insert_Input>;
  signedOrder?: InputMaybe<Scalars["jsonb"]>;
  tokenId?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Scalars["String"]>;
};

/** aggregate max on columns */
export type Order_Max_Fields = {
  __typename?: "order_max_fields";
  chainId?: Maybe<Scalars["String"]>;
  contractAddress?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  tokenId?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

/** order by max() on columns of table "order" */
export type Order_Max_Order_By = {
  chainId?: InputMaybe<Order_By>;
  contractAddress?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Order_Min_Fields = {
  __typename?: "order_min_fields";
  chainId?: Maybe<Scalars["String"]>;
  contractAddress?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  tokenId?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

/** order by min() on columns of table "order" */
export type Order_Min_Order_By = {
  chainId?: InputMaybe<Order_By>;
  contractAddress?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "order" */
export type Order_Mutation_Response = {
  __typename?: "order_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Array<Order>;
};

/** on_conflict condition type for table "order" */
export type Order_On_Conflict = {
  constraint: Order_Constraint;
  update_columns?: Array<Order_Update_Column>;
  where?: InputMaybe<Order_Bool_Exp>;
};

/** Ordering options when selecting data from "order". */
export type Order_Order_By = {
  chainId?: InputMaybe<Order_By>;
  contractAddress?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isValid?: InputMaybe<Order_By>;
  nft?: InputMaybe<Nft_Order_By>;
  signedOrder?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: order */
export type Order_Pk_Columns_Input = {
  id: Scalars["String"];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Order_Prepend_Input = {
  signedOrder?: InputMaybe<Scalars["jsonb"]>;
};

/** select columns of table "order" */
export enum Order_Select_Column {
  /** column name */
  ChainId = "chainId",
  /** column name */
  ContractAddress = "contractAddress",
  /** column name */
  Id = "id",
  /** column name */
  IsValid = "isValid",
  /** column name */
  SignedOrder = "signedOrder",
  /** column name */
  TokenId = "tokenId",
  /** column name */
  Type = "type",
}

/** input type for updating data in table "order" */
export type Order_Set_Input = {
  chainId?: InputMaybe<Scalars["String"]>;
  contractAddress?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  isValid?: InputMaybe<Scalars["Boolean"]>;
  signedOrder?: InputMaybe<Scalars["jsonb"]>;
  tokenId?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Scalars["String"]>;
};

/** update columns of table "order" */
export enum Order_Update_Column {
  /** column name */
  ChainId = "chainId",
  /** column name */
  ContractAddress = "contractAddress",
  /** column name */
  Id = "id",
  /** column name */
  IsValid = "isValid",
  /** column name */
  SignedOrder = "signedOrder",
  /** column name */
  TokenId = "tokenId",
  /** column name */
  Type = "type",
}

export type Query_Root = {
  __typename?: "query_root";
  /** fetch data from the table: "contract" */
  contract: Array<Contract>;
  /** fetch aggregated fields from the table: "contract" */
  contract_aggregate: Contract_Aggregate;
  /** fetch data from the table: "contract" using primary key columns */
  contract_by_pk?: Maybe<Contract>;
  /** fetch data from the table: "nft" */
  nft: Array<Nft>;
  /** fetch aggregated fields from the table: "nft" */
  nft_aggregate: Nft_Aggregate;
  /** fetch data from the table: "nft" using primary key columns */
  nft_by_pk?: Maybe<Nft>;
  /** fetch data from the table: "order" */
  order: Array<Order>;
  /** fetch aggregated fields from the table: "order" */
  order_aggregate: Order_Aggregate;
  /** fetch data from the table: "order" using primary key columns */
  order_by_pk?: Maybe<Order>;
};

export type Query_RootContractArgs = {
  distinct_on?: InputMaybe<Array<Contract_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Contract_Order_By>>;
  where?: InputMaybe<Contract_Bool_Exp>;
};

export type Query_RootContract_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contract_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Contract_Order_By>>;
  where?: InputMaybe<Contract_Bool_Exp>;
};

export type Query_RootContract_By_PkArgs = {
  chainId: Scalars["String"];
  contractAddress: Scalars["String"];
};

export type Query_RootNftArgs = {
  distinct_on?: InputMaybe<Array<Nft_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Nft_Order_By>>;
  where?: InputMaybe<Nft_Bool_Exp>;
};

export type Query_RootNft_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Nft_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Nft_Order_By>>;
  where?: InputMaybe<Nft_Bool_Exp>;
};

export type Query_RootNft_By_PkArgs = {
  chainId: Scalars["String"];
  contractAddress: Scalars["String"];
  tokenId: Scalars["String"];
};

export type Query_RootOrderArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};

export type Query_RootOrder_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};

export type Query_RootOrder_By_PkArgs = {
  id: Scalars["String"];
};

export type Subscription_Root = {
  __typename?: "subscription_root";
  /** fetch data from the table: "contract" */
  contract: Array<Contract>;
  /** fetch aggregated fields from the table: "contract" */
  contract_aggregate: Contract_Aggregate;
  /** fetch data from the table: "contract" using primary key columns */
  contract_by_pk?: Maybe<Contract>;
  /** fetch data from the table: "nft" */
  nft: Array<Nft>;
  /** fetch aggregated fields from the table: "nft" */
  nft_aggregate: Nft_Aggregate;
  /** fetch data from the table: "nft" using primary key columns */
  nft_by_pk?: Maybe<Nft>;
  /** fetch data from the table: "order" */
  order: Array<Order>;
  /** fetch aggregated fields from the table: "order" */
  order_aggregate: Order_Aggregate;
  /** fetch data from the table: "order" using primary key columns */
  order_by_pk?: Maybe<Order>;
};

export type Subscription_RootContractArgs = {
  distinct_on?: InputMaybe<Array<Contract_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Contract_Order_By>>;
  where?: InputMaybe<Contract_Bool_Exp>;
};

export type Subscription_RootContract_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contract_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Contract_Order_By>>;
  where?: InputMaybe<Contract_Bool_Exp>;
};

export type Subscription_RootContract_By_PkArgs = {
  chainId: Scalars["String"];
  contractAddress: Scalars["String"];
};

export type Subscription_RootNftArgs = {
  distinct_on?: InputMaybe<Array<Nft_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Nft_Order_By>>;
  where?: InputMaybe<Nft_Bool_Exp>;
};

export type Subscription_RootNft_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Nft_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Nft_Order_By>>;
  where?: InputMaybe<Nft_Bool_Exp>;
};

export type Subscription_RootNft_By_PkArgs = {
  chainId: Scalars["String"];
  contractAddress: Scalars["String"];
  tokenId: Scalars["String"];
};

export type Subscription_RootOrderArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};

export type Subscription_RootOrder_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};

export type Subscription_RootOrder_By_PkArgs = {
  id: Scalars["String"];
};

export type NftHasValidOrderQueryVariables = Exact<{ [key: string]: never }>;

export type NftHasValidOrderQuery = {
  __typename?: "query_root";
  nft: Array<{
    __typename?: "nft";
    chainId: string;
    contractAddress: string;
    tokenId: string;
    holder: string;
    metadata: any;
  }>;
};

export type NftQueryVariables = Exact<{
  chainId?: InputMaybe<Scalars["String"]>;
  contractAddress?: InputMaybe<Scalars["String"]>;
  tokenId?: InputMaybe<Scalars["String"]>;
}>;

export type NftQuery = {
  __typename?: "query_root";
  nft: Array<{
    __typename?: "nft";
    holder: string;
    chainId: string;
    contractAddress: string;
    tokenId: string;
    metadata: any;
    contract?: { __typename?: "contract"; supportsInterface: any } | null;
    orders: Array<{
      __typename?: "order";
      id: string;
      nft?: { __typename?: "nft"; chainId: string; contractAddress: string; tokenId: string; metadata: any } | null;
    }>;
  }>;
};

export const NftHasValidOrderDocument = gql`
  query NFTHasValidOrder {
    nft(where: { orders: { isValid: { _eq: true } } }) {
      chainId
      contractAddress
      tokenId
      holder
      metadata
    }
  }
`;

/**
 * __useNftHasValidOrderQuery__
 *
 * To run a query within a React component, call `useNftHasValidOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useNftHasValidOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNftHasValidOrderQuery({
 *   variables: {
 *   },
 * });
 */
export function useNftHasValidOrderQuery(
  baseOptions?: Apollo.QueryHookOptions<NftHasValidOrderQuery, NftHasValidOrderQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<NftHasValidOrderQuery, NftHasValidOrderQueryVariables>(NftHasValidOrderDocument, options);
}
export function useNftHasValidOrderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<NftHasValidOrderQuery, NftHasValidOrderQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<NftHasValidOrderQuery, NftHasValidOrderQueryVariables>(NftHasValidOrderDocument, options);
}
export type NftHasValidOrderQueryHookResult = ReturnType<typeof useNftHasValidOrderQuery>;
export type NftHasValidOrderLazyQueryHookResult = ReturnType<typeof useNftHasValidOrderLazyQuery>;
export type NftHasValidOrderQueryResult = Apollo.QueryResult<NftHasValidOrderQuery, NftHasValidOrderQueryVariables>;
export const NftDocument = gql`
  query NFT($chainId: String, $contractAddress: String, $tokenId: String) {
    nft(where: { chainId: { _eq: $chainId }, contractAddress: { _eq: $contractAddress }, tokenId: { _eq: $tokenId } }) {
      holder
      chainId
      contractAddress
      tokenId
      metadata
      contract {
        supportsInterface
      }
      orders {
        id
        nft {
          chainId
          contractAddress
          tokenId
          metadata
        }
      }
    }
  }
`;

/**
 * __useNftQuery__
 *
 * To run a query within a React component, call `useNftQuery` and pass it any options that fit your needs.
 * When your component renders, `useNftQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNftQuery({
 *   variables: {
 *      chainId: // value for 'chainId'
 *      contractAddress: // value for 'contractAddress'
 *      tokenId: // value for 'tokenId'
 *   },
 * });
 */
export function useNftQuery(baseOptions?: Apollo.QueryHookOptions<NftQuery, NftQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<NftQuery, NftQueryVariables>(NftDocument, options);
}
export function useNftLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NftQuery, NftQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<NftQuery, NftQueryVariables>(NftDocument, options);
}
export type NftQueryHookResult = ReturnType<typeof useNftQuery>;
export type NftLazyQueryHookResult = ReturnType<typeof useNftLazyQuery>;
export type NftQueryResult = Apollo.QueryResult<NftQuery, NftQueryVariables>;
