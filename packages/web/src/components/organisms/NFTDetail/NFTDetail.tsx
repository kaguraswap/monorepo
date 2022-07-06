import { Box, Button, Text } from "@chakra-ui/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import React from "react";

import { NFT } from "../../../../../common/types/nft";
import { getFirebaseApp } from "../../../lib/firebase";
import { createOrder, toHash } from "../../../lib/order";

export interface NFTDetailProps {
  nft: NFT;
}

export const NFTDetail: React.FC<NFTDetailProps> = ({ nft }) => {
  const submitOrder = async () => {
    const order = createOrder();
    const app = getFirebaseApp();
    const hash = await toHash(order);
    await setDoc(doc(getFirestore(app), "orders", hash), order);
    console.log(hash);
  };

  return (
    <Box>
      <Text>{nft.chainId}</Text>
      <Text>{nft.contractAddress}</Text>
      <Text>{nft.tokenId}</Text>
      {nft.collection && (
        <Box>
          <Text>{nft.collection.name}</Text>
        </Box>
      )}
      {nft.metadata && (
        <Box>
          <Text>{nft.metadata.name}</Text>
          <Text>{nft.metadata.description}</Text>
          <Text>{nft.metadata.image}</Text>
        </Box>
      )}
      <Button onClick={submitOrder}>Create Order</Button>
    </Box>
  );
};
