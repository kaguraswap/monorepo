import {
  Box,
  Button,
  FormControl,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ConnectWallet } from "components/molecules/ConnectWallet";
import { NFTListItem } from "components/molecules/NFTListItem";
import { useIsWagmiConnected } from "hooks/useIsWagmiConnected";
import { useIsNFTOrderAvailable } from "hooks/useNFTOrderAvailable";
import { useSwap } from "hooks/useSwap";
import React from "react";
import { useAccount } from "wagmi";

import { DEFAULT_PRICE, DEFAULT_TIP } from "../../../../../common/configs/app";
import networks from "../../../../../common/configs/networks.json";
import protocols from "../../../../../common/configs/protocols.json";
import { Nft } from "../../../../../common/dist/graphql";
import { ChainId } from "../../../../../common/entities/network";
import { NFT } from "../../../../../common/entities/nft";
import { OrderType } from "../../../../../common/entities/order";
import { useInput } from "../../../hooks/useInput";

export interface NFTDetailProps {
  nft: Nft;
}

export const NFTDetail: React.FC<NFTDetailProps> = ({ nft }) => {
  const { value: inputPrice, handleInput: handleInputPrice } = useInput(DEFAULT_PRICE);
  const { value: selectedProtocol, handleInput: handleSelectedProtocol } = useInput<OrderType>("seaport");
  const { value: inputTip, handleInput: handleInputTip } = useInput(DEFAULT_TIP);

  const { isWagmiConnected } = useIsWagmiConnected();
  const { address } = useAccount();

  const { offer: _offer, cancel: _cancel, fulfill: _fulfill } = useSwap();
  const { isNFTOrderAvailable } = useIsNFTOrderAvailable(nft);

  const offer = async () => {
    await _offer(selectedProtocol, "sell", nft as NFT, inputPrice, inputTip);
  };

  const cancel = async () => {
    await _cancel(selectedProtocol, nft.orders[0].signedOrder);
  };

  const fulfill = async () => {
    await _fulfill(selectedProtocol, nft.orders[0].signedOrder);
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="8" maxWidth="4xl" mx="auto">
      <NFTListItem nft={nft} />
      <Box>
        <Box>
          {!isWagmiConnected && <ConnectWallet buttonProps={{ width: "100%" }} />}
          {isWagmiConnected && (
            <>
              {nft.holder === address?.toLowerCase() && (
                <>
                  {!isNFTOrderAvailable && (
                    <>
                      <VStack spacing={2} mb="8">
                        <FormControl>
                          <Text fontWeight="bold">Price</Text>
                          <NumberInput step={0.01} min={0} defaultValue={DEFAULT_PRICE} onChange={handleInputPrice}>
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                        <FormControl>
                          <Text fontWeight="bold">Tip</Text>
                          <NumberInput
                            step={0.5}
                            min={0}
                            max={100}
                            defaultValue={DEFAULT_TIP}
                            onChange={handleInputTip}
                          >
                            <NumberInputField placeholder="Amount" />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                        <FormControl>
                          <Text fontWeight="bold">Protocol</Text>
                          <Select onChange={handleSelectedProtocol} value={selectedProtocol}>
                            {networks[nft.chainId as ChainId].protocols.map((protocol) => (
                              <option key={protocol} value={protocol}>
                                {protocols[protocol as OrderType].name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </VStack>
                      <Button width="100%" onClick={offer}>
                        Sell
                      </Button>
                    </>
                  )}
                  {isNFTOrderAvailable && (
                    <>
                      <Button width="100%" onClick={cancel}>
                        Cancel
                      </Button>
                    </>
                  )}
                </>
              )}
              {nft.holder !== address?.toLowerCase() && (
                <>
                  {/* TODO: implement offer */}
                  {!isNFTOrderAvailable && <></>}
                  {isNFTOrderAvailable && (
                    <>
                      <Button width="100%" onClick={fulfill}>
                        Buy
                      </Button>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    </SimpleGrid>
  );
};
