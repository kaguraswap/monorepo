export type HasuraCondition = { [key: string]: { [key: string]: string | string[] } | HasuraCondition };

export type HasuraVariables = {
  where: HasuraCondition;
  orderBy: HasuraCondition;
  limit: number;
  offset: number;
};
