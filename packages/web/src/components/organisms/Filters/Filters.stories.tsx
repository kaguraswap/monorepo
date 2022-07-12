import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Filters as Component } from "./Filters";

export default {
  title: "Organisms/Filters",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Filters = Template.bind({});
Filters.args = {};
