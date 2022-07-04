import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { asset } from "../../../../../common/utils/fixture";
import { AssetTemplate as Component } from "./Asset";

export default {
  title: "Templates/Asset",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Asset = Template.bind({});
Asset.args = {
  asset,
};