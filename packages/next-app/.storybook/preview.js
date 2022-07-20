import "./polyfill";

import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
import { RecoilRoot } from "recoil";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <RecoilRoot>
      <WagmiConfig client={client}>
        <Story />
      </WagmiConfig>
    </RecoilRoot>
  ),
];
