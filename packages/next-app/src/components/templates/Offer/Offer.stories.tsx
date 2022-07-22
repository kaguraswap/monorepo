import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { OfferTemplate as Component } from "./Offer";

export default {
  title: "Templates/Offer",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Offer = Template.bind({});

Offer.args = {};
