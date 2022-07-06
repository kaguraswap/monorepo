import { ChakraProvider } from "@chakra-ui/react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const desiredChainId = ChainId.Mumbai;
  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
