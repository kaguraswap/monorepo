import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { nft } from "../../../../../common/entities/nft";
import { order } from "../../../../../common/entities/order";
import { OrderDetail as Component } from "./OrderDetail";

export default {
  title: "Organisms/OrderDetail",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const OrderDetail = Template.bind({});
OrderDetail.args = {
  order: {
    ...order,
    nft,
  },
};
