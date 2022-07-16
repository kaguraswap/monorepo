import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { nfts } from "../../../../../common/entities/nft";
import { HomeTemplate as Component } from "./Home";

export default {
  title: "Templates/Home",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Home = Template.bind({});
Home.args = {
  nfts,
};
