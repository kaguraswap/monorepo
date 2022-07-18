import {
  Button,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerProps,
  Flex,
} from "@chakra-ui/react";
import React from "react";

type FilterDrawerProps = Pick<DrawerProps, "isOpen" | "onClose" | "children">;

export const FilterDrawer: React.FC<FilterDrawerProps> = ({ onClose, isOpen, children }) => {
  return (
    <Drawer
      placement="left"
      isFullHeight
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      trapFocus={false}
    >
      <DrawerContent>
        <DrawerHeader px="4">
          <Flex justify="right" align="center">
            <CloseButton onClick={onClose} />
          </Flex>
        </DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        <DrawerFooter px="4">
          <Button onClick={onClose}>Apply</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
