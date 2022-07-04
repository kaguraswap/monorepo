import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { assets } from "../../../../../common/utils/fixture";
import { AssetList as Component } from "./AssetList";

export default {
  title: "Organisms/AssetList",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const AssetList = Template.bind({});

AssetList.args = {
  assets,
};
