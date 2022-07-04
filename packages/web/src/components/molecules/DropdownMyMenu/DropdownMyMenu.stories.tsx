import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { DropdownMyMenu as Component } from "./DropdownMyMenu";

export default {
  title: "Molecules/DropdownMyMenu",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const DropdownMyMenu = Template.bind({});
DropdownMyMenu.args = {};
