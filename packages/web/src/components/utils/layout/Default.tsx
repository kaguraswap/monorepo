import { Container, Flex, Stack } from "@chakra-ui/react";
import React from "react";

import { Footer } from "../../organisms/Footer";
import { Header } from "../../organisms/Header";
import { Head } from "../Head";

export interface DefaultLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
  type?: "summary" | "summary_large_image";
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  title = "KaguraSwap",
  description = "Multichain NFT Marketplace aggregator built with Seaport and 0x",
  image = "https://kaguraswap.com/brand/banner.png",
  type = "summary_large_image",
}) => {
  return (
    <Flex minHeight={"100vh"} direction={"column"}>
      <Head title={title} description={description} image={image} type={type} />
      <Header />
      <Container flex={1} maxW={"7xl"}>
        {children}
      </Container>
      <Footer />
    </Flex>
  );
};
