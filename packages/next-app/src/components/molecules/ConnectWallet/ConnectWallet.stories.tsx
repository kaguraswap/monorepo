import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ConnectWallet as Component } from "./ConnectWallet";

export default {
  title: "Molecules/ConnectWallet",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const ConnectWalletButton = Template.bind({});
ConnectWalletButton.args = {};
