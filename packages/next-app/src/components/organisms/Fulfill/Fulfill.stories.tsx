import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Fulfill as Component } from "./Fulfill";

export default {
  title: "Organisms/Fulfill",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Fulfill = Template.bind({});
Fulfill.args = {};
