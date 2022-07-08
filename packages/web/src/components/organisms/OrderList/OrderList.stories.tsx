import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { nft } from "../../../../../common/entities/nft";
import { orders } from "../../../../../common/entities/order";
import { OrderList as Component } from "./OrderList";

export default {
  title: "Organisms/OrderList",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const OrderList = Template.bind({});

OrderList.args = {
  orders: orders.map((order) => {
    return {
      ...order,
      nft,
    };
  }),
};
