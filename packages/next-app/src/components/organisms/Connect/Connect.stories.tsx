import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Connect as Component } from "./Connect";

export default {
  title: "Organisms/Connect",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Connect = Template.bind({});
Connect.args = {};
