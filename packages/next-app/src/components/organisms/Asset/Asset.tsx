import { ExternalLinkIcon } from "@chakra-ui/icons";
import { AspectRatio, Box, Button, HStack, IconButton, Image, Skeleton, Text, useDisclosure } from "@chakra-ui/react";
import { Link } from "components/atoms/Link";
import { Modal } from "components/molecules/Modal";
import { Cancel } from "components/organisms/Cancel";
import { Fulfill } from "components/organisms/Fulfill";
import { Offer } from "components/organisms/Offer";
import { useIframe } from "hooks/useIframe";
import { useIsWagmiConnected } from "hooks/useIsWagmiConnected";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineZoomIn } from "react-icons/ai";
import { Action } from "types/ui";
import { useAccount } from "wagmi";

import { AssetFragment } from "../../../../../hasura/dist/graphql";
import networks from "../../../../../shared/src/configs/networks.json";
import { ChainId } from "../../../../../shared/src/types/network";
import { truncate } from "../../../../../shared/src/utils/text";
import { usePath } from "./usePath";

export interface AssetProps {
  asset: AssetFragment;
  action?: Action;
}

export const Asset: React.FC<AssetProps> = ({ asset, action }) => {
  const { isWagmiConnected } = useIsWagmiConnected();
  const { address } = useAccount();
  const router = useRouter();
  const {
    isOpen: isOfferModalOpen,
    onOpen: onOfferModalOpen,
    onClose: onOfferModalClose,
  } = useDisclosure({ defaultIsOpen: action === "offer" });
  const {
    isOpen: isFulfillModalOpen,
    onOpen: onFulfillModalOpen,
    onClose: onFulfillModalClose,
  } = useDisclosure({ defaultIsOpen: action === "fulfill" });
  const {
    isOpen: isCancelModalOpen,
    onOpen: onCancelModalOpen,
    onClose: onCancelModalClose,
  } = useDisclosure({ defaultIsOpen: action === "cancel" });

  const { isIframe, post } = useIframe();
  const { path } = usePath(asset.chainId, asset.contractAddress, asset.tokenId);

  const moveToAsset = () => {
    const url = `${path}`;
    if (!isIframe) {
      router.push(url);
    } else {
      post("redirect", url);
    }
  };

  const moveToOffer = () => {
    const url = `${path}?action=offer`;
    if (!isIframe) {
      onOfferModalOpen();
    } else {
      post("redirect", url);
    }
  };

  const moveToFulfill = () => {
    const url = `${path}?action=fulfill`;
    if (!isIframe) {
      onFulfillModalOpen();
    } else {
      post("redirect", url);
    }
  };

  const moveToCancel = () => {
    const url = `${path}?action=cancel`;
    if (!isIframe) {
      onCancelModalOpen();
    } else {
      post("redirect", url);
    }
  };

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
      <Link href={`${networks[asset.chainId as ChainId].explorer}/address/${asset.contractAddress}`}>
        <HStack position="absolute" top="2" right="2" color="blue.800" fontSize={"xs"}>
          <Text>{truncate(asset.contractAddress, 7, 7)}</Text>
          <ExternalLinkIcon />
        </HStack>
      </Link>
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
                {asset.validOrders.length === 0 && <Button onClick={moveToOffer}>Sell</Button>}
                {asset.validOrders.length > 0 && <Button onClick={moveToCancel}>Cancel</Button>}
              </>
            )}
            {address !== asset.holder && (
              <>{asset.validOrders.length > 0 && <Button onClick={moveToFulfill}>Buy</Button>}</>
            )}
          </>
        )}
        <IconButton onClick={moveToAsset} icon={<AiOutlineZoomIn />} aria-label="detail" />
      </HStack>
      <Modal onClose={onOfferModalClose} isOpen={isOfferModalOpen} modalContentProps={{ maxWidth: "xl" }}>
        <Offer />
      </Modal>
      <Modal onClose={onFulfillModalClose} isOpen={isFulfillModalOpen} modalContentProps={{ maxWidth: "xl" }}>
        <Fulfill />
      </Modal>
      <Modal onClose={onCancelModalClose} isOpen={isCancelModalOpen} modalContentProps={{ maxWidth: "xl" }}>
        <Cancel />
      </Modal>
    </Box>
  );
};
