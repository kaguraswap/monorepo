import { OrderDirection_Enum, OrderProtocol_Enum } from "../../dist/graphql";

export const isOrderDirection = (orderDirection: string): orderDirection is OrderDirection_Enum => {
  return Object.values(OrderDirection_Enum).includes(<OrderDirection_Enum>orderDirection);
};

export const isOrderProtocol = (orderProtocol: string): orderProtocol is OrderProtocol_Enum => {
  return Object.values(OrderProtocol_Enum).includes(<OrderProtocol_Enum>orderProtocol);
};
