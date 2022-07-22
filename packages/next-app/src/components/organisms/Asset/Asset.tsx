import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Box,
  Button,
  CloseButton,
  Flex,
  FormControl,
  HStack,
  Image,
  Skeleton,
  SlideFade,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "components/atoms/Link";
import { Connect } from "components/organisms/Connect";
import { ethers } from "ethers";
import { useIframe } from "hooks/useIframe";
import { useIsWagmiConnected } from "hooks/useIsWagmiConnected";
import { useSwap } from "hooks/useSwap";
import { userModeState } from "lib/recoil/mode";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";
import { useAccount } from "wagmi";

import { AssetFragment, OrderDirection_Enum, OrderProtocol_Enum } from "../../../../../hasura/dist/graphql";
import networks from "../../../../../shared/src/configs/networks.json";
import { ChainId } from "../../../../../shared/src/types/network";
import { truncate } from "../../../../../shared/src/utils/text";
import { useMarketIcons } from "./useMarketIcons";
import { usePath } from "./usePath";

export interface AssetProps {
  asset: AssetFragment;
}

export const Asset: React.FC<AssetProps> = ({ asset }) => {
  const { isWagmiConnected } = useIsWagmiConnected();
  let { address } = useAccount();
  // TODO: make it better
  address = address?.toLowerCase();
  const router = useRouter();

  const { isIframe, post } = useIframe();
  const { path } = usePath(asset.chainId, asset.contractAddress, asset.tokenId);
  const { marketIcons } = useMarketIcons(asset.chainId);

  const { isNoAssetMetadataMode } = useRecoilValue(userModeState);
  const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();

  const overlayBackgroundColor = useColorModeValue("gray.100", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const [order] = asset.validOrders;
  console.log(order);

  const moveToAsset = () => {
    const url = `${path}`;
    if (!isIframe) {
      router.push(url);
    } else {
      post("redirect", url);
    }
  };

  const { offer, fulfill, cancel } = useSwap();

  return (
    <Box
      border="1px"
      rounded="xl"
      borderColor={borderColor}
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
        src={`/icons/networks/${networks[asset.chainId as ChainId].icon}`}
        alt="Dan Abramov"
      />
      <Link href={`${networks[asset.chainId as ChainId].explorer}/address/${asset.contractAddress}`}>
        <HStack position="absolute" top="2" right="2" fontSize={"xs"}>
          <Text>{truncate(asset.contractAddress, 7, 7)}</Text>
          <ExternalLinkIcon />
        </HStack>
      </Link>
      <Text position="absolute" top="6" right="2" fontSize={"xs"}>
        # {truncate(asset.tokenId, 5, 5)}
      </Text>

      <AspectRatio ratio={1} position="relative">
        <>
          {!isNoAssetMetadataMode && (
            <Image
              mx="auto"
              width="100%"
              src={asset.metadata.image}
              alt={asset.metadata.name}
              fallback={<Skeleton />}
              borderRadius="xl"
            />
          )}
          {isNoAssetMetadataMode && (
            <Box>
              {/* //TODO: better design and make it fallback */}
              <Text fontSize={"xs"}>
                {asset.chainId}:{asset.contractAddress}:{asset.tokenId}
              </Text>
            </Box>
          )}
          <Box opacity="90%">
            <Box
              as={SlideFade}
              in={isConfirmOpen}
              h="100%"
              w="100%"
              p="2"
              backgroundColor={overlayBackgroundColor}
              offsetY="100%"
            >
              <Flex justify="space-between">
                <Text>Confirm</Text>
                <CloseButton onClick={onConfirmClose} />
              </Flex>
              <FormControl>Form</FormControl>
            </Box>
          </Box>
        </>
      </AspectRatio>

      <Box h="10" p="2">
        {!isNoAssetMetadataMode && <Text fontSize={"xs"}>{truncate(asset.metadata.name, 16)}</Text>}
      </Box>
      <HStack position="absolute" bottom="16" right="2" spacing="2">
        {marketIcons.map((marketIcon: string) => {
          return <Image key={marketIcon} src={`/icons/markets/${marketIcon}`} alt={marketIcon} w="4" h="4" />;
        })}
        <Image src={`/brand/logo.png`} alt={"logo"} w="4" h="4" onClick={moveToAsset} />
      </HStack>
      <HStack position="absolute" bottom="2" right="2" spacing="2">
        {/* //TODO: better control */}
        {address !== asset.holder && (
          <>
            {order && (
              <>
                {!isConfirmOpen && (
                  <Button rounded="xl" onClick={onConfirmOpen}>
                    Buy
                  </Button>
                )}
                {isConfirmOpen && (
                  <>
                    {!isWagmiConnected && <Connect />}
                    {isWagmiConnected && (
                      <Button
                        rounded="xl"
                        onClick={() => {
                          fulfill(order.protocol as any, order.signedOrder as any);
                        }}
                      >
                        Confirm
                      </Button>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {address === asset.holder && (
          <>
            {!order && (
              <>
                {!isConfirmOpen && (
                  <Button rounded="xl" onClick={onConfirmOpen}>
                    Sell
                  </Button>
                )}
                {isConfirmOpen && (
                  <>
                    {!isWagmiConnected && <Connect />}
                    {isWagmiConnected && (
                      <Button
                        rounded="xl"
                        onClick={() => {
                          offer(
                            OrderProtocol_Enum.Seaport,
                            OrderDirection_Enum.Sell,
                            asset.chainId,
                            asset.contractAddress,
                            asset.tokenId,
                            "0.001",
                            "2.5"
                          );
                        }}
                      >
                        Confirm
                      </Button>
                    )}
                  </>
                )}
              </>
            )}
            {order && (
              <>
                {!isConfirmOpen && (
                  <Button rounded="xl" onClick={onConfirmOpen}>
                    Cancel
                  </Button>
                )}
                {isConfirmOpen && (
                  <>
                    {!isWagmiConnected && <Connect />}
                    {isWagmiConnected && (
                      <Button
                        rounded="xl"
                        onClick={() => {
                          cancel(order.protocol as any, order.signedOrder as any);
                        }}
                      >
                        Confirm
                      </Button>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </HStack>
      <Text position="absolute" bottom="2" left="4" fontWeight={"bold"}>
        {/* //TODO: control which order is target */}
        {/* //TODO: modify design */}
        {/* //TODO: modify dynamyc currency */}
        {/* //TODO: modify .0 decimals */}
        {order && `${ethers.utils.formatEther(String(order.price))} ETH`}
      </Text>
    </Box>
  );
};
