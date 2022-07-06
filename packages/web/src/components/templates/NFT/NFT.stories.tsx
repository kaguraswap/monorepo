import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { nft } from "../../../../../common/utils/fixture";
import { NFTTemplate as Component } from "./NFT";

export default {
  title: "Templates/NFT",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const NFT = Template.bind({});
NFT.args = {
  nft,
};
