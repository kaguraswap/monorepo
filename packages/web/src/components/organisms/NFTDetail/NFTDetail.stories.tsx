import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { nft, orders } from "../../../../../common/utils/fixture";
import { NFTDetail as Component } from "./NFTDetail";

export default {
  title: "Organisms/NFTDetail",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const NFTDetail = Template.bind({});

NFTDetail.args = {
  nft,
  orders,
};
