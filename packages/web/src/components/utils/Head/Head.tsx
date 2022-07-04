import NextHead from "next/head";
import React from "react";

export interface HeadProps {
  title: string;
  description: string;
  image: string;
  type: "summary" | "summary_large_image";
}

export const Head: React.FC<HeadProps> = ({ title, description, image, type }) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta property="og:url" content="https://kaguraswap.com" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="KaguraSwap" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content={type} />
    </NextHead>
  );
};
