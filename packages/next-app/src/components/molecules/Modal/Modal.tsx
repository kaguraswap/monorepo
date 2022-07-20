import {
  Modal as _Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  modalContentProps?: ModalContentProps;
}

export const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, modalContentProps }) => {
  return (
    <_Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent {...modalContentProps} m="4">
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody p="8">{children}</ModalBody>
      </ModalContent>
    </_Modal>
  );
};
