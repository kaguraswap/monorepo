import { Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export interface LinkProps extends ChakraLinkProps {
  href?: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ href, children, ...rest }) => {
  return href ? (
    <NextLink href={href} passHref>
      <ChakraLink style={{ textDecoration: "none" }} {...rest}>
        {children}
      </ChakraLink>
    </NextLink>
  ) : (
    <ChakraLink style={{ textDecoration: "none" }} {...rest}>
      {children}
    </ChakraLink>
  );
};
