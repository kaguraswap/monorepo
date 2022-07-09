import { ChakraProvider } from "@chakra-ui/react";
// import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { getDefaultProvider } from "ethers";
import type { AppProps } from "next/app";
import { createClient, WagmiConfig } from "wagmi";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

function MyApp({ Component, pageProps }: AppProps) {
  // const desiredChainId = ChainId.Mumbai;
  return (
    <WagmiConfig client={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </WagmiConfig>
  );
}

export default MyApp;
