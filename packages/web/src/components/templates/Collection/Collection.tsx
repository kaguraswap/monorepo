import { Text } from "@chakra-ui/react";
import React from "react";

import { Collection } from "../../../../../common/types/collection";
import { NFTList } from "../../organisms/NFTList";
import { DefaultLayout } from "../../utils/layout";

export interface CollectionTemplateProps {
  collection: Collection;
}

export const CollectionTemplate: React.FC<CollectionTemplateProps> = ({ collection }) => {
  return (
    <DefaultLayout>
      <Text>{collection.name}</Text>
      <Text>{collection.description}</Text>
      <Text>{collection.banner}</Text>
      <Text>{collection.logo}</Text>
      {collection.nfts && <NFTList nfts={collection.nfts} />}
    </DefaultLayout>
  );
};
