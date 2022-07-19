import { useIsMounted } from "hooks/useIsMounted";
import React from "react";
import { useAccount } from "wagmi";

export const useIsWagmiConnected = () => {
  const [isWagmiConnected, setIsWagmiConnected] = React.useState(false);

  const isMounted = useIsMounted();
  const { isConnected } = useAccount();

  React.useEffect(() => {
    setIsWagmiConnected(isMounted && isConnected);
  }, [isMounted, isConnected]);

  return { isWagmiConnected };
};
