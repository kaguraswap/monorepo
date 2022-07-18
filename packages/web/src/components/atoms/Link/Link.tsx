import { Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export interface LinkProps {
  href?: string;
  children: React.ReactNode;
  chakraLinkProps?: ChakraLinkProps;
}

export const Link: React.FC<LinkProps> = ({ href, children, chakraLinkProps }) => {
  return href ? (
    <NextLink href={href} passHref>
      <ChakraLink {...chakraLinkProps} style={{ textDecoration: "none" }}>
        {children}
      </ChakraLink>
    </NextLink>
  ) : (
    <ChakraLink {...chakraLinkProps} style={{ textDecoration: "none" }}>
      {children}
    </ChakraLink>
  );
};
