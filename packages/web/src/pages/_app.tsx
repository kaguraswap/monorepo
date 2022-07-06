import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MoralisProvider
        serverUrl={"https://zuik862kkoww.usemoralis.com:2053/server"}
        appId={"Quc5FRSSDMHygFgnrjezoyGsfIaGQOgyOneXtttz"}
      >
        <Component {...pageProps} />
      </MoralisProvider>
    </ChakraProvider>
  );
}

export default MyApp;
