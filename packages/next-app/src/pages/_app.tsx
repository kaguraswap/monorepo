import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { chakraTheme } from "lib/chakra";
import { wagmiClient } from "lib/wagmi";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { WagmiConfig } from "wagmi";

import { apolloClient } from "../../../hasura/src/lib/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={chakraTheme}>
          <WagmiConfig client={wagmiClient}>
            <Component {...pageProps} />
          </WagmiConfig>
        </ChakraProvider>
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default MyApp;
