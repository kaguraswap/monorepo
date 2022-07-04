import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { assets } from "../../../../../common/utils/fixture";
import { PortofolioTemplate as Component } from "./Portofolio";

export default {
  title: "Templates/Portofolio",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Portofolio = Template.bind({});
Portofolio.args = {
  assets,
};
