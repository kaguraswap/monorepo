import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import assets from "../../../../../hasura/dist/fixtures/graphql/assets.json";
import { AssetsTemplate as Component } from "./Assets";

export default {
  title: "Templates/Assets",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Assets = Template.bind({});

Assets.args = {
  assets,
};
