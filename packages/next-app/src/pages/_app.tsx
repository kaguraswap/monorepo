import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { apolloClient } from "lib/apollo";
import { wagmiClient } from "lib/wagmi";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <WagmiConfig client={wagmiClient}>
          <Component {...pageProps} />
        </WagmiConfig>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
