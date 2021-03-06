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
  message: "Notification Message",
  link: "http://localhost:6006",
};
