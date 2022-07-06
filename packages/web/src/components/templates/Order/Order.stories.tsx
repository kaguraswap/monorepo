import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { nfts } from "../../../../../common/utils/fixture";
import { OrderTemplate as Component } from "./Order";

export default {
  title: "Templates/Order",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Order = Template.bind({});
Order.args = {
  nfts,
};
