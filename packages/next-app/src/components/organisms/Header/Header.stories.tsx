import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Header as Component } from "./Header";

export default {
  title: "Organisms/Header",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Header = Template.bind({});
Header.args = {};
