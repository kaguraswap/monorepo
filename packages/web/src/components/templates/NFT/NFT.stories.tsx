import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { nft } from "../../../../../common/entities/nft";
import { orders } from "../../../../../common/entities/order";
import { NFTTemplate as Component } from "./NFT";

export default {
  title: "Templates/NFT",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const NFT = Template.bind({});
NFT.args = {
  nft,
  orders,
};
