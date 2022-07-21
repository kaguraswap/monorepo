import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ConnectWallet as Component } from "./ConnectWallet";

export default {
  title: "Organisms/Connect Wallet",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const ConnectWallet = Template.bind({});
ConnectWallet.args = {};
