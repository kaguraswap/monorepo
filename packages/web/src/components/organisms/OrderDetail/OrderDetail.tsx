import { Box, Text } from "@chakra-ui/react";
import React from "react";

import { Order } from "../../../../../common/types/order";

export interface OrderDetailProps {
  order: Order;
}

export const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  return (
    <Box>
      <Text>{JSON.stringify(order)}</Text>
    </Box>
  );
};
