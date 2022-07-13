import { Modal as _Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React from "react";

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  return (
    <_Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent m="4" maxWidth={"2xl"}>
        <ModalCloseButton />
        <ModalBody px="6" pt="10" pb="6">
          {children}
        </ModalBody>
      </ModalContent>
    </_Modal>
  );
};
