import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { OrderDetail as Component } from "./OrderDetail";

export default {
  title: "Organisms/OrderDetail",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Order = Template.bind({});
Order.args = {};
