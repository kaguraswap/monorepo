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
import { AssetListItem } from "components/molecules/AssetListItem";
import { ConnectWallet } from "components/molecules/ConnectWallet";
import { useInput } from "hooks/useInput";
import { useIsWagmiConnected } from "hooks/useIsWagmiConnected";
import { useSwap } from "hooks/useSwap";
import React from "react";
import { useAccount } from "wagmi";

import { OrderDirection_Enum, OrderProtocol_Enum } from "../../../../../hasura/dist/graphql";
import { AssetFragment } from "../../../../../shared/dist/graphql";
import { DEFAULT_PRICE, DEFAULT_TIP } from "../../../../../shared/src/configs/app";
import networks from "../../../../../shared/src/configs/networks.json";
import protocols from "../../../../../shared/src/configs/protocols.json";
import { ChainId } from "../../../../../shared/src/types/network";

export interface AssetProps {
  asset: AssetFragment;
}

export const Asset: React.FC<AssetProps> = ({ asset }) => {
  const { value: inputPrice, handleInput: handleInputPrice } = useInput(DEFAULT_PRICE);
  const { value: selectedProtocol, handleInput: handleSelectedProtocol } = useInput<OrderProtocol_Enum>(
    OrderProtocol_Enum.Seaport
  );
  const { value: inputTip, handleInput: handleInputTip } = useInput(DEFAULT_TIP);

  const { isWagmiConnected } = useIsWagmiConnected();
  const { address } = useAccount();

  const { offer: _offer, cancel: _cancel, fulfill: _fulfill } = useSwap();

  const offer = async () => {
    await _offer(
      selectedProtocol,
      OrderDirection_Enum.Sell,
      asset.chainId,
      asset.contractAddress,
      asset.tokenId,
      inputPrice,
      inputTip
    );
  };

  const cancel = async () => {
    await _cancel(selectedProtocol, asset.validOrders[0].signedOrder);
  };

  const fulfill = async () => {
    await _fulfill(selectedProtocol, asset.validOrders[0].signedOrder);
  };

  const network = networks[asset.chainId as ChainId].name;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="8" maxWidth="4xl" mx="auto">
      <AssetListItem
        network={network}
        tokenId={asset.tokenId}
        image={asset.metadata.image}
        name={asset.metadata.name}
      />
      <Box>
        <Box>
          {!isWagmiConnected && <ConnectWallet buttonProps={{ width: "100%" }} />}
          {isWagmiConnected && (
            <>
              {asset.holder === address?.toLowerCase() && (
                <>
                  {asset.validOrders.length === 0 && (
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
                            {networks[asset.chainId as ChainId].protocols.map((protocol) => (
                              <option key={protocol} value={protocol}>
                                {protocols[protocol as "seaport" | "zeroEx"].name}
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
                  {asset.validOrders.length > 0 && (
                    <>
                      <Button width="100%" onClick={cancel}>
                        Cancel
                      </Button>
                    </>
                  )}
                </>
              )}
              {asset.holder !== address?.toLowerCase() && (
                <>
                  {/* TODO: implement offer */}
                  {asset.validOrders.length === 0 && <></>}
                  {asset.validOrders.length > 0 && (
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
