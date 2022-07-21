import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import asset from "../../../../../hasura/dist/fixtures/graphql/asset.json";
import { Asset as Component } from "./Asset";

export default {
  title: "Organisms/Asset",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Asset = Template.bind({});

Asset.args = {
  asset,
};
