import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import assets from "../../../../../hasura/dist/fixtures/graphql/assets.json";
import { Assets as Component } from "./Assets";

export default {
  title: "Organisms/Assets",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Assets = Template.bind({});

const firstAssets = assets.slice(0, 30);

const loadMore = () => {
  console.log("loaded");
};

Assets.args = {
  assets: firstAssets,
  loadMore: loadMore,
  hasMore: true,
};
