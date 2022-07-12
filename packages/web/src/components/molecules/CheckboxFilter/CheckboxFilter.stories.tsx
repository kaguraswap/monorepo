import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { CheckboxFilter as Component } from "./CheckboxFilter";

export default {
  title: "Molecules/CheckboxFilter",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const CheckboxFilter = Template.bind({});
CheckboxFilter.args = {
  options: [
    { label: "sell", value: "sell" },
    { label: "buy", value: "buy" },
  ],
};
