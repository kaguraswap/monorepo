import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";

import { apolloClient } from "../lib/apollo";
import { wagmiClient } from "../lib/wagmi";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <WagmiConfig client={wagmiClient}>
        <ChakraProvider
          theme={extendTheme({
            fonts: {
              heading: "Roboto",
              body: "Roboto",
            },
          })}
        >
          <Component {...pageProps} />
        </ChakraProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
}

export default MyApp;
