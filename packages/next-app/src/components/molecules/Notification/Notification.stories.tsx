import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Notification as Component } from "./Notification";

export default {
  title: "Molecules/Notification",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Notification = Template.bind({});

Notification.args = {
  message: "Order Created",
  link: "https://rinkeby.etherscan.io/tx/0x4a3a7730c604541d0754eda01baf704a8d3ce2b807ff303c95c674bfd8a195ff",
  close: () => {
    console.log("close");
  },
};
