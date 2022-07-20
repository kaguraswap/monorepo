import { Button, FormControl, HStack, IconButton, Input, Select, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { Link } from "components/atoms/Link";
import { Modal } from "components/molecules/Modal";
import { useInput } from "hooks/useInput";
import router from "next/router";
import React from "react";
import { MdAdd } from "react-icons/md";

import networks from "../../../../../common/configs/networks.json";
import { ChainId } from "../../../../../common/types/network";

export type SwapStatus = "inputOffer" | "inputPrice" | "preview";
export type SwapType = "offer" | "fulfill";
export type InputNFTMethod = "url" | "manual";

export interface OfferProps {
  status?: SwapStatus;
  type?: SwapType;
}

// TODO: add clear
export const AddAsset: React.FC<OfferProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { value: selectedInputNFTMethod, handleInput: handleSelectedInputNFTMethod } = useInput<InputNFTMethod>("url");
  const { value: selectedChainId, handleInput: handleChainIdChange } = useInput<ChainId>("1");
  const { value: inputContractAddress, handleInput: handleContractAddressChange } = useInput("");
  const { value: inputTokenId, handleInput: handleTokenIdChange } = useInput("");

  const [url, setURL] = React.useState("");

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setURL(e.target.value);
    const [tokenId, contractAddress, chainId] = e.target.value.split("/").reverse();
    // TODO: add validate
    if (tokenId && contractAddress && chainId) {
      handleChainIdChange(chainId);
      handleContractAddressChange(contractAddress);
      handleTokenIdChange(tokenId);
      handleSelectedInputNFTMethod("manual");
    }
  };

  const isNFTFieldReady = React.useMemo(() => {
    return selectedChainId && inputContractAddress !== "" && inputTokenId !== "";
  }, [selectedChainId, inputContractAddress, inputTokenId]);

  const addNFT = () => {
    if (!isNFTFieldReady) {
      return;
    }
    router.push(`/assets/${selectedChainId}/${inputContractAddress}/${inputTokenId}`);
  };

  return (
    <>
      <IconButton aria-label="Add" rounded="xl" icon={<MdAdd />} onClick={onOpen}>
        Add
      </IconButton>
      <Modal onClose={onClose} isOpen={isOpen} modalContentProps={{ maxWidth: "xl" }}>
        <VStack spacing={2} mb="8">
          {selectedInputNFTMethod === "url" && (
            <FormControl>
              <HStack justify={"space-between"}>
                <Text fontWeight="bold">URL</Text>
                <Text fontSize="xs" textAlign={"right"}>
                  <Link chakraLinkProps={{ onClick: () => handleSelectedInputNFTMethod("manual") }}>
                    Input manually
                  </Link>
                </Text>
              </HStack>
              <Input onChange={handleURLChange} value={url} />
            </FormControl>
          )}
          {selectedInputNFTMethod === "manual" && (
            <>
              <FormControl>
                <HStack justify={"space-between"}>
                  <Text fontWeight="bold">Network</Text>
                  <Text fontSize="xs" textAlign={"right"}>
                    <Link chakraLinkProps={{ onClick: () => handleSelectedInputNFTMethod("url") }}>from URL</Link>
                  </Text>
                </HStack>
                <Select onChange={handleChainIdChange} value={selectedChainId}>
                  {Object.entries(networks).map(([chainId, { name }]) => (
                    <option key={chainId} value={chainId}>
                      {name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <Text fontWeight="bold">Contract Address</Text>
                <Input onChange={handleContractAddressChange} value={inputContractAddress} />
              </FormControl>
              <FormControl>
                <Text fontWeight="bold">Token ID</Text>
                <Input onChange={handleTokenIdChange} value={inputTokenId} />
              </FormControl>
            </>
          )}
        </VStack>
        <Button onClick={addNFT} width="100%" disabled={!isNFTFieldReady}>
          Add NFT
        </Button>
      </Modal>
    </>
  );
};
