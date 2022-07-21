import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Wallet as Component } from "./Wallet";

export default {
  title: "Organisms/Wallet",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Wallet = Template.bind({});
Wallet.args = {};
