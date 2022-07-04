import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { DropdownSelectNetwork as Component } from "./DropdownSelectNetwork";

export default {
  title: "Molecules/DropdownSelectNetwork",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const DropdownSelectNetwork = Template.bind({});
DropdownSelectNetwork.args = {};
