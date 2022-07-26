import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import assets from "../../../../../hasura/dist/fixtures/graphql/assets.json";
import { HomeTemplate as Component } from "./Home";

export default {
  title: "Templates/Home",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Home = Template.bind({});

const firstAssets = assets.slice(0, 30);

const loadMore = () => {
  console.log("loaded");
};

Home.args = {
  assets: firstAssets,
  loadMore: loadMore,
  hasMore: true,
};
