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

Assets.args = {
  assets,
};
