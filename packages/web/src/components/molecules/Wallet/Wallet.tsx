import { Button, Icon, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { IoWalletOutline } from "react-icons/io5";
import { useAccount, useDisconnect } from "wagmi";

import { shortenAddress } from "../../../../../common/utils/wallet";

export const Wallet: React.FC = () => {
  const { onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const disconnectWallet = () => {
    disconnect();
    onClose();
  };

  return (
    <Popover trigger="hover" placement={"bottom"} defaultIsOpen={false}>
      <PopoverTrigger>
        <Button rounded="xl" leftIcon={<Icon as={IoWalletOutline} />} onClick={onOpen}>
          {shortenAddress(address)}
        </Button>
      </PopoverTrigger>
      <PopoverContent p="4">
        <Button onClick={disconnectWallet} rounded="xl">
          Disconnect
        </Button>
      </PopoverContent>
    </Popover>
  );
};
