import {
  Modal as _Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

export interface ModalProps extends Pick<ModalContentProps, "maxWidth"> {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, maxWidth }) => {
  return (
    <_Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxWidth={maxWidth}>
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody px="4" py="8">
          {children}
        </ModalBody>
      </ModalContent>
    </_Modal>
  );
};
