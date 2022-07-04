import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ href, children }) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLink style={{ textDecoration: "none" }}>{children}</ChakraLink>
    </NextLink>
  );
};
