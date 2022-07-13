import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSwap } from "components/organisms/Swap/useSwap";
import router from "next/router";
import React from "react";

import { DEFAULT_PRICE, DEFAULT_TIP } from "../../../../../common/configs/app";
import networks from "../../../../../common/configs/networks.json";
import protocols from "../../../../../common/configs/protocols.json";
import { ChainId } from "../../../../../common/entities/network";
import { OrderDirection, OrderType } from "../../../../../common/entities/order";
import { useInput } from "../../../hooks/useInput";

export type SwapStatus = "input" | "preview";
export type SwapType = "offer" | "fulfill";
export type InputNFTMethod = "url" | "manual";

export interface SwapProps {
  status?: SwapStatus;
  type?: SwapType;
}

export const Swap: React.FC<SwapProps> = ({ type = "offer", status = "input" }) => {
  const [statusState, setStatusState] = React.useState(status);
  const { value: selectedInputNFTMethod, handleInput: handleSelectedInputNFTMethod } = useInput<InputNFTMethod>("url");
  const { value: selectedDirection, handleInput: handleSelectedDirection } = useInput<OrderDirection>("sell");
  const { value: inputPrice, handleInput: handleInputPrice } = useInput(DEFAULT_PRICE);
  const { value: selectedChainId, handleInput: handleChainIdChange } = useInput<ChainId>("1");
  const { value: inputContractAddress, handleInput: handleContractAddressChange } = useInput("");
  const { value: inputTokenId, handleInput: handleTokenIdChange } = useInput("");
  const { value: selectedProtocol, handleInput: handleSelectedProtocol } = useInput<OrderType>("seaport");
  const { value: inputTip, handleInput: handleInputTip } = useInput(DEFAULT_TIP);

  const { offer: _offer, fulfill } = useSwap();

  const offer = async () => {
    const order = await _offer(
      selectedProtocol,
      selectedDirection,
      { chainId: selectedChainId, contractAddress: inputContractAddress, tokenId: inputTokenId },
      inputPrice,
      inputTip
    );
    if (!order) {
      return;
    }
    router.push(`/orders/${order.id}`);
  };

  return (
    <Box>
      {statusState === "input" && (
        <Box>
          <VStack spacing={1} mb="8">
            {selectedInputNFTMethod === "url" && (
              <FormControl>
                <HStack justify={"space-between"}>
                  <Text fontSize="sm">URL</Text>
                  <Text fontSize="xs" textAlign={"right"}>
                    <Link onClick={() => handleSelectedInputNFTMethod("manual")}>Input manually</Link>
                  </Text>
                </HStack>
                <Input />
              </FormControl>
            )}
            {selectedInputNFTMethod === "manual" && (
              <>
                <FormControl>
                  <HStack justify={"space-between"}>
                    <Text fontSize="sm">Network</Text>
                    <Text fontSize="xs" textAlign={"right"}>
                      <Link onClick={() => handleSelectedInputNFTMethod("url")}>from URL</Link>
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
                  <Text fontSize="sm">Contract Address</Text>
                  <Input onChange={handleContractAddressChange} value={inputContractAddress} />
                </FormControl>
                <FormControl>
                  <Text fontSize="sm">Token ID</Text>
                  <Input onChange={handleTokenIdChange} value={inputTokenId} />
                </FormControl>
              </>
            )}
            <FormControl>
              <Text fontSize="sm">Price</Text>
              <NumberInput step={0.01} min={0} defaultValue={DEFAULT_PRICE} onChange={handleInputPrice}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </VStack>
          <HStack justify={"space-between"}>
            <Button
              onClick={() => {
                handleSelectedDirection("sell");
                setStatusState("preview");
              }}
              width="100%"
            >
              Sell
            </Button>
            <Button
              onClick={() => {
                handleSelectedDirection("buy");
                setStatusState("preview");
              }}
              width="100%"
            >
              Buy
            </Button>
          </HStack>
        </Box>
      )}
      {statusState === "preview" && (
        <Box>
          <VStack spacing={1} mb="8">
            <FormControl>
              <Text>Swap Protocol</Text>
              <Select onChange={handleSelectedProtocol} value={selectedProtocol}>
                {networks[selectedChainId].protocols.map((protocol) => (
                  <option key={protocol} value={protocol}>
                    {protocols[protocol as OrderType].name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <Text>Tip</Text>
              <NumberInput step={0.5} min={0} max={100} defaultValue={DEFAULT_TIP} onChange={handleInputTip}>
                <NumberInputField placeholder="Amount" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </VStack>
          <HStack justify={"space-between"}>
            <Button onClick={() => setStatusState("input")} width="100%">
              Back
            </Button>
            <Button onClick={offer} width="100%">
              Confirm
            </Button>
          </HStack>
        </Box>
      )}
    </Box>
  );
};
