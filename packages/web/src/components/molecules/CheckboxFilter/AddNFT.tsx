import { IconButton, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { MdAdd } from "react-icons/md";

import { Modal } from "../Modal";

export const AddNFT: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton aria-label="Add" rounded="xl" icon={<MdAdd />} onClick={onOpen}>
        Add
      </IconButton>
      <Modal onClose={onClose} isOpen={isOpen}>
        Modal
      </Modal>
    </>
  );
};
