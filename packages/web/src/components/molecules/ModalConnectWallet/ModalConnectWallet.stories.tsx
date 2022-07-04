import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ModalConnectWallet as Component } from "./ModalConnectWallet";

export default {
  title: "Molecules/ModalConnectWallet",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const ModalConnectWallet = Template.bind({});
ModalConnectWallet.args = {};
