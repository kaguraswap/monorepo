import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { CancelTemplate as Component } from "./Cancel";

export default {
  title: "Templates/Cancel",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Cancel = Template.bind({});

Cancel.args = {};
