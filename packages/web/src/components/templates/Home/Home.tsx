import { Button, Heading, Text, VStack } from "@chakra-ui/react";
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
      <VStack justify={"center"} py="32" spacing={"8"}>
        <VStack>
          <Heading fontWeight={"bold"} fontSize={"6xl"}>
            KaguraSwap
          </Heading>
          <Text fontSize={"sm"}>Multichain NFT Swap built with Seaport & 0x!</Text>
        </VStack>
        <Button>Create Swap</Button>
      </VStack>
      <Text textAlign={"center"} mb="12" fontSize={"xl"}>
        Available Swaps
      </Text>
      <Filters />
      <OrderList orders={orders} />
    </DefaultLayout>
  );
};
