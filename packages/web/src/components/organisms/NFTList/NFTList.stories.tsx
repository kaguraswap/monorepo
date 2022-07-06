import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { nfts } from "../../../../../common/utils/fixture";
import { NFTList as Component } from "./NFTList";

export default {
  title: "Organisms/NFTList",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const NFTList = Template.bind({});

NFTList.args = {
  nfts,
};
