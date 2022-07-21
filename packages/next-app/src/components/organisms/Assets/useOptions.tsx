import { userModeState } from "lib/recoil/mode";
import React from "react";
import { useRecoilValue } from "recoil";

import networks from "../../../../../shared/src/configs/networks.json";
import protocols from "../../../../../shared/src/configs/protocols.json";

export const useOptions = () => {
  const { isIncludeTestnetMode } = useRecoilValue(userModeState);

  const protocolFilterOptions = React.useMemo(() => {
    return Object.entries(protocols).map(([protocol, { name }]) => {
      return { label: name, value: protocol };
    });
  }, []);

  const networkFilterOptions = React.useMemo(() => {
    return Object.entries(networks)
      .filter(([, { env }]) => {
        return isIncludeTestnetMode ? true : env === "mainnet";
      })
      .map(([chainId, { name }]) => {
        return { label: name, value: chainId };
      });
  }, [isIncludeTestnetMode]);

  return { protocolFilterOptions, networkFilterOptions };
};
