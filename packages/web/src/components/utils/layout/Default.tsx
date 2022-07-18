import { Container, Flex } from "@chakra-ui/react";
import React from "react";

import { Footer } from "../../organisms/Footer";
import { Header } from "../../organisms/Header";
import { Head } from "../Head";

export interface DefaultLayoutProps {
  children: React.ReactNode;
  maxWidth?: string;
  title?: string;
  description?: string;
  image?: string;
  type?: "summary" | "summary_large_image";
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  maxWidth = "100%",
  title,
  description,
  image,
  type,
}) => {
  return (
    <Flex minHeight={"100vh"} direction={"column"}>
      <Head title={title} description={description} image={image} type={type} />
      <Header />
      <Container maxWidth={maxWidth} flex={1} p="4">
        {children}
      </Container>
      <Footer />
    </Flex>
  );
};
