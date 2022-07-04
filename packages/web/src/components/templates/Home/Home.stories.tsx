import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { HomeTemplate } from "./Home";

export default {
  title: "Templates/Home",
  component: HomeTemplate,
} as ComponentMeta<typeof HomeTemplate>;

const Template: ComponentStory<typeof HomeTemplate> = (args) => <HomeTemplate {...args} />;

export const Home = Template.bind({});
Home.args = {};
