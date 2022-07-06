import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ConnectedWallet as Component } from "./ConnectedWallet";

export default {
  title: "Molecules/ConnectedWallet",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const ConnectedWallet = Template.bind({});
ConnectedWallet.args = {};
