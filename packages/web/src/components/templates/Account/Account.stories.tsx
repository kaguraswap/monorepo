import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { nfts } from "../../../../../common/utils/fixture";
import { AccountTemplate as Component } from "./Account";

export default {
  title: "Templates/Account",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Account = Template.bind({});
Account.args = {
  nfts,
};
