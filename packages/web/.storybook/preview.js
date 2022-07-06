import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
const desiredChainId = ChainId.Rinkeby;
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
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <Story />
    </ThirdwebProvider>
  ),
];
