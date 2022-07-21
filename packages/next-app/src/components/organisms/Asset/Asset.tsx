import { AspectRatio, Box, Button, HStack, IconButton, Image, Skeleton, Text } from "@chakra-ui/react";
import { Link } from "components/atoms/Link";
import { useIsWagmiConnected } from "hooks/useIsWagmiConnected";
import React from "react";
import { AiOutlineZoomIn } from "react-icons/ai";
import { useAccount } from "wagmi";

import { AssetFragment } from "../../../../../hasura/dist/graphql";
import networks from "../../../../../shared/src/configs/networks.json";
import { ChainId } from "../../../../../shared/src/types/network";
import { truncate } from "../../../../../shared/src/utils/text";

export interface AssetProps {
  asset: AssetFragment;
}

export const Asset: React.FC<AssetProps> = ({ asset }) => {
  const { isWagmiConnected } = useIsWagmiConnected();
  const { address } = useAccount();

  return (
    <Box
      border="1px"
      rounded="xl"
      borderColor="gray.200"
      width="100%"
      as="section"
      position="relative"
      className="group"
      px="2"
      py="12"
      maxWidth={"xs"}
      mx="auto"
    >
      <Image
        position="absolute"
        top="2"
        left="2"
        borderRadius="full"
        w="4"
        h="4"
        src={`/icons/${networks[asset.chainId as ChainId].icon}`}
        alt="Dan Abramov"
      />
      <Text position="absolute" top="2" right="2" fontSize={"xs"}>
        {truncate(asset.contractAddress, 7, 7)}
      </Text>
      <Text position="absolute" top="6" right="2" fontSize={"xs"}>
        # {truncate(asset.tokenId, 5, 5)}
      </Text>
      <AspectRatio ratio={1}>
        <Image
          mx="auto"
          width="100%"
          src={asset.metadata.image}
          alt={asset.metadata.name}
          fallback={<Skeleton />}
          borderRadius="xl"
        />
      </AspectRatio>
      <Box h="12" p="2">
        <Text fontSize={"xs"}>{truncate(asset.metadata.name, 20)}</Text>
      </Box>
      <HStack position="absolute" bottom="2" right="2" spacing="2">
        {isWagmiConnected && (
          <>
            {address === asset.holder && (
              <>
                {asset.validOrders.length === 0 && <Button>Sell</Button>}
                {asset.validOrders.length > 0 && <Button>Cancel</Button>}
              </>
            )}
            {address !== asset.holder && <>{asset.validOrders.length > 0 && <Button>Buy</Button>}</>}
          </>
        )}
        <Link href={`/assets/${asset.chainId}/${asset.contractAddress}/${asset.tokenId}`}>
          <IconButton icon={<AiOutlineZoomIn />} aria-label="detail" />
        </Link>
      </HStack>
    </Box>
  );
};
