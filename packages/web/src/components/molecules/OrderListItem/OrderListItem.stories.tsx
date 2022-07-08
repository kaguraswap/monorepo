import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { nft } from "../../../../../common/entities/nft";
import { order } from "../../../../../common/entities/order";
import { OrderListItem as Component } from "./OrderListItem";

export default {
  title: "Molecules/OrderListItem",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const OrderListItem = Template.bind({});

OrderListItem.args = {
  order: {
    ...order,
    nft,
  },
};
