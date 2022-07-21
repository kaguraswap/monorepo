import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Link as Component } from "./Link";

export default {
  title: "Atoms/Link",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Link = Template.bind({});
Link.args = {
  href: "http://localhost:6006",
  children: "Link",
};
