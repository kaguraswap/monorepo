import { Box, Button, Flex, IconButton, Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { icons } from "components/organisms/Footer/data";
import React from "react";
import { IoMenuOutline } from "react-icons/io5";

export const Menu: React.FC = () => {
  return (
    <>
      <Popover trigger="click" openDelay={0} placement="bottom" defaultIsOpen={false} gutter={12}>
        <Box>
          <PopoverTrigger>
            <IconButton rounded="xl" aria-label={"setting"} icon={<IoMenuOutline />} />
          </PopoverTrigger>
          <PopoverContent p="5" width={{ base: "xs", md: "xs" }}>
            <Flex direction={{ base: "column", md: "column" }} gap={2} px={3}>
              {icons.map((icon) => {
                return (
                  <Button key={icon.key} as="a" href={icon.href} target="_blank" leftIcon={icon.icon}>
                    {icon.key}
                  </Button>
                );
              })}
            </Flex>
          </PopoverContent>
        </Box>
      </Popover>
    </>
  );
};
