import React from "react";

import { Order } from "../../../../../common/entities/order";
import { Filters } from "../../organisms/Filters";
import { OrderList } from "../../organisms/OrderList";
import { DefaultLayout } from "../../utils/layout";

export interface HomeTemplateProps {
  orders: Order[];
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({ orders }) => {
  return (
    <DefaultLayout>
      <Filters />
      <OrderList orders={orders} />
    </DefaultLayout>
  );
};
