import {
  Box,
  Button,
  ButtonGroup,
  Center,
  CloseButton,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FiInfo } from "react-icons/fi";

export interface NotificationsProps {
  message: string;
  link: string;
  close: () => void;
}

export const Notification: React.FC<NotificationsProps> = ({ message, link, close }) => {
  return (
    <Box as="section" pt={{ base: "4", md: "8" }} pb={{ base: "12", md: "24" }} px={{ base: "4", md: "8" }}>
      <Flex direction="row-reverse">
        <Flex
          direction={{ base: "column", sm: "row" }}
          width={{ base: "full", sm: "md" }}
          boxShadow={useColorModeValue("md", "md-dark")}
          bg="white"
          borderRadius="lg"
          overflow="hidden"
        >
          <Center display={{ base: "none", sm: "flex" }} bg="blue.500" px="5">
            <Icon as={FiInfo} boxSize="10" color="white" />
          </Center>
          <Stack direction="row" p="4" spacing="3" flex="1">
            <Stack spacing="2.5" flex="1">
              <Stack spacing="1">
                <Text fontSize="sm" color="muted">
                  {message}
                </Text>
              </Stack>
              <ButtonGroup variant="link" size="sm" spacing="3">
                <Link href={link} isExternal>
                  <Button colorScheme="teal">Link</Button>
                </Link>
              </ButtonGroup>
            </Stack>
            <CloseButton transform="translateY(-6px)" onClick={close} />
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};
