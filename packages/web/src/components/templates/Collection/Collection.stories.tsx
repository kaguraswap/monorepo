import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { collection } from "../../../../../common/utils/fixture";
import { CollectionTemplate as Component } from "./Collection";

export default {
  title: "Templates/Collection",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Collection = Template.bind({});
Collection.args = {
  collection,
};
