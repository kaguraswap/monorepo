import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { nft } from "../../../../../common/utils/fixture";
import { NFTListItem as Component } from "./NFTListItem";

export default {
  title: "Molecules/NFTListItem",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const NFTListItem = Template.bind({});

NFTListItem.args = {
  nft,
};
