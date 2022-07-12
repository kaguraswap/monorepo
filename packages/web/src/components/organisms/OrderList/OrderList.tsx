import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";

import { Order } from "../../../../../common/entities/order";
import { Link } from "../../atoms/Link";
import { OrderListItem } from "../../molecules/OrderListItem";

export interface OrderListProps {
  orders: Order[];
}

export const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <Box maxW="7xl" mx="auto" p={"4"}>
      <SimpleGrid gap="4">
        {orders.map((order) => (
          <Link key={order.id} href={`/orders/${order.id}`}>
            <OrderListItem order={order} />
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};
