import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { asset } from "../../../../../common/utils/fixture";
import { AssetListItem as Component } from "./AssetListItem";

export default {
  title: "Molecules/AssetListItem",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const AssetListItem = Template.bind({});

AssetListItem.args = {
  asset,
};
