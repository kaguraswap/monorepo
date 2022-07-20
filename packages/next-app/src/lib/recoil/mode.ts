import { atom } from "recoil";

export const userModeState = atom({
  key: "mode",
  default: {
    isIncludeTestnetMode: false,
    isNoAssetMetadataMode: false,
  },
});
