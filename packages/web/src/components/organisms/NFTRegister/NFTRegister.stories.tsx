import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { NFTRegister as Component } from "./NFTRegister";

export default {
  title: "Organisms/NFTRegister",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const NFTRegister = Template.bind({});

NFTRegister.args = {};
