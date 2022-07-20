import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Setting as Component } from "./Setting";

export default {
  title: "Molecules/Setting",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Header = Template.bind({});
Header.args = {};
