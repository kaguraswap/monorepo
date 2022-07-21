import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { AddAsset as Component } from "./AddAsset";

export default {
  title: "Organisms/Add Asset",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const AddAsset = Template.bind({});
AddAsset.args = {};
