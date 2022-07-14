import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { NFTList } from "components/organisms/NFTList";
import React from "react";

import { NFT } from "../../../../../common/entities/nft";
import { Filters } from "../../organisms/Filters";
import { DefaultLayout } from "../../utils/layout";

export interface HomeTemplateProps {
  nfts: NFT[];
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({ nfts }) => {
  return (
    <DefaultLayout>
      <VStack justify={"center"} py="32" spacing={"8"}>
        <VStack>
          <Heading fontWeight={"bold"} fontSize={"6xl"}>
            KaguraSwap
          </Heading>
          <Text fontSize={"sm"}>Multichain NFT Swap built with Seaport & 0x!</Text>
        </VStack>
        <Button>Create Swap</Button>
      </VStack>
      <Filters />
      <NFTList nfts={nfts} />
    </DefaultLayout>
  );
};
