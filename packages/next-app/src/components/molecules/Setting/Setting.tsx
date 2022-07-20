import { FormControl, FormLabel, IconButton, Switch, useColorMode,useDisclosure, VStack } from "@chakra-ui/react";
import { userModeState } from "lib/recoil/mode";
import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useRecoilState } from "recoil";

import { Modal } from "../Modal";
import { isIncludeTestnetModeKey, isNoAssetMetadataModeKey } from "./data";

export const Setting: React.FC = () => {
  const [mode, setMode] = useRecoilState(userModeState);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();

  const toggle = (key: string) => {
    const current = localStorage.getItem(key) === "true";
    const toggled = !current;
    setMode({ ...mode, [key]: toggled });
    localStorage.setItem(key, String(toggled));
  };

  React.useEffect(() => {
    setMode({
      [isNoAssetMetadataModeKey]: localStorage.getItem(isNoAssetMetadataModeKey) === "true",
      [isIncludeTestnetModeKey]: localStorage.getItem(isIncludeTestnetModeKey) === "true",
    });
  }, [setMode]);

  return (
    <>
      <IconButton rounded="xl" aria-label={"setting"} icon={<IoSettingsOutline />} onClick={onOpen} />
      <Modal onClose={onClose} isOpen={isOpen}>
        <VStack spacing="4">
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Dark mode</FormLabel>
            <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">No asset metadata mode</FormLabel>
            <Switch
              isChecked={mode.isNoAssetMetadataMode}
              onChange={() => {
                toggle(isNoAssetMetadataModeKey);
              }}
            />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Include Testnet</FormLabel>
            <Switch
              isChecked={mode.isIncludeTestnetMode}
              onChange={() => {
                toggle(isIncludeTestnetModeKey);
              }}
            />
          </FormControl>
        </VStack>
      </Modal>
    </>
  );
};
