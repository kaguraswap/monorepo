import { Button, ButtonProps, Image, Stack, useDisclosure } from "@chakra-ui/react";
import { Modal } from "components/molecules/Modal";
import { injectedConnector, walletConnectConnector } from "lib/wagmi";
import React from "react";
import { useConnect } from "wagmi";

export interface ConnectWalletProps {
  buttonProps?: ButtonProps;
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({ buttonProps }) => {
  const { connect } = useConnect();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button {...buttonProps} rounded="xl" onClick={onOpen}>
        Connect Wallet
      </Button>
      <Modal onClose={onClose} isOpen={isOpen}>
        <Stack spacing="4" px="8">
          <Button
            width="100%"
            rounded="xl"
            leftIcon={<Image src={`/icons/metamask.svg`} alt="metamask-logo" width="6" />}
            onClick={() => connect({ connector: injectedConnector })}
          >
            Metamask
          </Button>
          {/* TODO: Wallet Connect */}
          <Button
            width="100%"
            rounded="xl"
            leftIcon={<Image src={`/icons/wallet-connect.svg`} alt="wallet-connect-logo" width="6" />}
            onClick={() => connect({ connector: walletConnectConnector })}
          >
            Wallet Connect
          </Button>
        </Stack>
      </Modal>
    </>
  );
};
