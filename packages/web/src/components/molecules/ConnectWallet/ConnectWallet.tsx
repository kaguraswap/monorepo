import { Button, Stack, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useConnect } from "wagmi";

import { injectedConnector } from "../../../lib/wagmi";
import { Modal } from "../Modal";

export const ConnectWallet: React.FC = () => {
  const { connect } = useConnect();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button rounded="xl" onClick={onOpen}>
        Connect Wallet
      </Button>
      <Modal onClose={onClose} isOpen={isOpen}>
        <Stack spacing="4">
          <Button width="100%" rounded="xl" onClick={() => connect({ connector: injectedConnector })}>
            Metamask
          </Button>
          {/* TODO: Wallet Connect */}
          <Button width="100%" rounded="xl" onClick={() => connect({ connector: injectedConnector })}>
            Wallet Connect
          </Button>
        </Stack>
      </Modal>
    </>
  );
};
