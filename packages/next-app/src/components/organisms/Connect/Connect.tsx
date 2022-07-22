import { Button, ButtonProps, Stack, useDisclosure } from "@chakra-ui/react";
import { Modal } from "components/molecules/Modal";
import { injectedConnector } from "lib/wagmi";
import React from "react";
import { useConnect } from "wagmi";

export interface ConnectProps {
  buttonProps?: ButtonProps;
}

export const Connect: React.FC<ConnectProps> = ({ buttonProps }) => {
  const { connect } = useConnect();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button {...buttonProps} rounded="xl" onClick={onOpen}>
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
