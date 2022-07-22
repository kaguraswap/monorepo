import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Add as Component } from "./Add";

export default {
  title: "Organisms/Add",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Add = Template.bind({});
Add.args = {};
