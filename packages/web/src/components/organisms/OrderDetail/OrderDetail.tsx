import { Box, Button, Heading, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { ethers } from "ethers";
import React from "react";
import { useAccount, useSigner } from "wagmi";

import { Order } from "../../../../../common/entities/order";
import { fulfillOrder as _fulfillOrder } from "../../../../../sdk/lib";
import { ConnectWalletButton } from "../../molecules/ConnectWalletButton";

export interface OrderDetailProps {
  order: Order;
}

export const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  const [account] = useAccount();
  const [signer] = useSigner();

  const cancelOrder = async () => {
    if (!signer.data || !account.data || !order.signedOrder) {
      return;
    }
    const { address } = account.data;
    // const provider = signer.data.provider as ethers.providers.JsonRpcProvider;
    // const seaport = new Seaport(provider);
    // const cancel = await seaport.cancelOrders([order.signedOrder.parameters], address);
    // await cancel.transact();
  };

  const fulfillOrder = async () => {
    if (!signer.data || !account.data || !order.signedOrder) {
      return;
    }
    const { address } = account.data;
    const provider = signer.data.provider as ethers.providers.JsonRpcProvider;
    await _fulfillOrder(provider, order.type, order.signedOrder, address);
  };

  return (
    <Box>
      <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8", lg: "12" }} py={{ base: "6", md: "8", lg: "12" }}>
        <Stack direction={{ base: "column", lg: "row" }} spacing={{ base: "6", lg: "12", xl: "16" }}>
          {order.nft.metadata && <Image src={order.nft.metadata.image} alt={order.nft.metadata.name} width={"xl"} />}
          <Stack spacing={{ base: "6", lg: "8" }} maxW={{ lg: "sm" }} justify="center">
            <Stack spacing={{ base: "3", md: "4" }}>
              <Stack spacing="3">
                <Text fontSize="sm" fontWeight="medium" color={useColorModeValue("gray.600", "gray.400")}>
                  {order.nft.chainId}
                </Text>
                {order.nft.metadata && (
                  <Heading size="lg" fontWeight="medium">
                    {order.nft.metadata.name}
                  </Heading>
                )}
              </Stack>
              <Text color={useColorModeValue("gray.600", "gray.400")}>
                {order.nft.metadata ? order.nft.metadata.description : ""}
              </Text>
              <Text fontWeight="semibold">{order.direction} for</Text>
              <Text fontSize="xs">Currency: {order.currencyContractAddress}</Text>
              <Text fontSize="xs">Amount: {order.value}</Text>
            </Stack>
            {account.data ? (
              <>
                <Button colorScheme="blue" size="lg" onClick={cancelOrder}>
                  Cancel
                </Button>
                <Button colorScheme="blue" size="lg" onClick={fulfillOrder}>
                  Fulfill Order
                </Button>
              </>
            ) : (
              <ConnectWalletButton size="lg" />
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
