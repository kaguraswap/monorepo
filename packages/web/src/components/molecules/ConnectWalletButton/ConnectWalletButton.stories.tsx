import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ConnectWalletButton as Component } from "./ConnectWalletButton";

export default {
  title: "Molecules/ConnectWalletButton",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const ConnectWalletButton = Template.bind({});
ConnectWalletButton.args = {};
