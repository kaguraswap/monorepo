import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Setting as Component } from "./Setting";

export default {
  title: "Organisms/Setting",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Setting = Template.bind({});
Setting.args = {};
