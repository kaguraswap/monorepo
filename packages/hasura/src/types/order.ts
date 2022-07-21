import { OrderDirection_Enum, OrderProtocol_Enum } from "../../dist/graphql";

export const isOrderDirection = (orderDirection: string): orderDirection is OrderDirection_Enum => {
  return Object.keys(OrderDirection_Enum).includes(orderDirection);
};

export const isOrderProtocol = (orderProtocol: string): orderProtocol is OrderProtocol_Enum => {
  return Object.keys(OrderProtocol_Enum).includes(orderProtocol);
};
