import {
  Button,
  Flex,
  FormControl,
  HStack,
  IconButton,
  Input,
  Select,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Link } from "components/atoms/Link";
import { Modal } from "components/molecules/Modal";
import { useIframe } from "hooks/useIframe";
import { useInput } from "hooks/useInput";
import { validate } from "lib/ajv";
import { useRouter } from "next/router";
import React from "react";
import { MdAdd } from "react-icons/md";
import Iframe from "react-iframe";

import networks from "../../../../../shared/src/configs/networks.json";
import { ChainId } from "../../../../../shared/src/types/network";
import { InputNFTMethod, Status } from "./type";

export const Add: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { value: selectedInputNFTMethod, handleInput: handleSelectedInputNFTMethod } = useInput<InputNFTMethod>("url");
  const { value: selectedChainId, handleInput: handleChainIdChange } = useInput<ChainId>("1");
  const { value: inputContractAddress, handleInput: handleContractAddressChange } = useInput("");
  const { value: inputTokenId, handleInput: handleTokenIdChange } = useInput("");

  const [url, setURL] = React.useState("");
  const [status, setStatus] = React.useState<Status>("input");

  const router = useRouter();
  const { subscribe } = useIframe();

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setURL(e.target.value);
    const [tokenId, contractAddress, chainId] = e.target.value.split("/").reverse();
    if (validate.assetKey({ chainId, contractAddress, tokenId })) {
      handleChainIdChange(chainId);
      handleContractAddressChange(contractAddress);
      handleTokenIdChange(tokenId);
      handleSelectedInputNFTMethod("manual");
    }
  };

  const viewAsset = () => {
    subscribe("redirect", (value: string) => {
      router.push(value);
    });
    setStatus("view");
  };

  const isNFTFieldReady = React.useMemo(() => {
    return selectedChainId && inputContractAddress !== "" && inputTokenId !== "";
  }, [selectedChainId, inputContractAddress, inputTokenId]);

  return (
    <>
      <IconButton aria-label="add" rounded="xl" icon={<MdAdd />} onClick={onOpen}>
        Add
      </IconButton>
      <Modal onClose={onClose} isOpen={isOpen} modalContentProps={{ maxWidth: "xl" }}>
        {status === "input" && (
          <>
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
            <Button onClick={viewAsset} width="100%" disabled={!isNFTFieldReady}>
              Add NFT
            </Button>
          </>
        )}
        {status === "view" && (
          <Flex justify={"center"}>
            <Iframe
              url={`/assets/${selectedChainId}/${inputContractAddress}/${inputTokenId}?mode=embed`}
              height="430px"
            />
          </Flex>
        )}
      </Modal>
    </>
  );
};
