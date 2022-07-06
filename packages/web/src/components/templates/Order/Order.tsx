import React from "react";

import { Order } from "../../../../../common/types/order";
import { OrderDetail } from "../../organisms/OrderDetail";
import { DefaultLayout } from "../../utils/layout";

export interface OrderTemplateProps {
  order: Order;
}

export const OrderTemplate: React.FC<OrderTemplateProps> = ({ order }) => {
  return (
    <DefaultLayout>
      <OrderDetail order={order} />
    </DefaultLayout>
  );
};
