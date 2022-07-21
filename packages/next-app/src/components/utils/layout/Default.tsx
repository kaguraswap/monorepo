import { Container, Flex } from "@chakra-ui/react";
import { Footer } from "components/organisms/Footer";
import { Header } from "components/organisms/Header";
import { Head } from "components/utils/Head";
import React from "react";
import { Mode } from "types/ui";

export interface DefaultLayoutProps {
  children: React.ReactNode;
  maxWidth?: string;
  title?: string;
  description?: string;
  image?: string;
  type?: "summary" | "summary_large_image";
  mode?: Mode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  maxWidth = "100%",
  title,
  description,
  image,
  type,
  mode = "normal",
}) => {
  return (
    <Flex minHeight={"100vh"} direction={"column"}>
      <Head title={title} description={description} image={image} type={type} />
      {mode === "normal" && <Header />}
      <Container maxWidth={maxWidth} flex={1} p="4">
        {children}
      </Container>
      {mode === "normal" && <Footer />}
    </Flex>
  );
};
