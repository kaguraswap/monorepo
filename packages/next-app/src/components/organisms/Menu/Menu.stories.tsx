import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Menu as Component } from "./Menu";

export default {
  title: "Organisms/Menu",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Menu = Template.bind({});
Menu.args = {};
