import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";

import client from "../lib/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  const desiredChainId = ChainId.Mumbai;
  return (
    <ApolloProvider client={client}>
      <ThirdwebProvider desiredChainId={desiredChainId}>
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
      </ThirdwebProvider>
    </ApolloProvider>
  );
}

export default MyApp;
