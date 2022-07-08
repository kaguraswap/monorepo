import { Box, Flex, Image, Skeleton, Tag, Text } from "@chakra-ui/react";
import React from "react";

import { Order } from "../../../../../common/entities/order";

export interface OrderListItemProps {
  order: Order;
}

export const OrderListItem: React.FC<OrderListItemProps> = ({ order }) => {
  return (
    <Box border="1px" borderColor="gray.200" p="4">
      {order.nft.metadata && (
        <Flex>
          <Box position="relative" className="group">
            <Image
              src={order.nft.metadata.image}
              alt={order.nft.metadata.name}
              w="160"
              h="160"
              draggable="false"
              fallback={<Skeleton />}
            />
            <Box position="absolute" top="2" left="2">
              <Tag key={order.nft.chainId} bg={`${"purple"}.500`} color="white" fontWeight="semibold">
                {order.nft.chainId}
              </Tag>
            </Box>
            <Box position="absolute" bottom="1" right="1">
              <Tag key={order.nft.chainId} bg={`${"gray"}.400`} color="white" fontSize="xs">
                {order.type}
              </Tag>
            </Box>
          </Box>
          <Box px="8">
            <Box mb="2">
              <Text fontWeight="semibold">{order.nft.metadata.name}</Text>
              <Text fontSize="xs">Contract Address: {order.nft.contractAddress}</Text>
              <Text fontSize="xs">Token ID: {order.nft.tokenId}</Text>
            </Box>
            <Box>
              <Text fontWeight="semibold">{order.direction} for</Text>
              <Text fontSize="xs">Currency: {order.currencyContractAddress}</Text>
              <Text fontSize="xs">Amount: {order.value}</Text>
            </Box>
          </Box>
        </Flex>
      )}
    </Box>
  );
};
