import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { asset } from "../../../../../common/utils/fixture";
import { AssetDetail as Component } from "./AssetDetail";

export default {
  title: "Organisms/AssetDetail",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const AssetDetail = Template.bind({});

AssetDetail.args = {
  asset,
};
