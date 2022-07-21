import axios from "axios";
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";

import { KaguraSDK } from "../../../hardhat/lib";
import { SignedOrder } from "../../../hardhat/types/order";
import { OrderDirection_Enum, OrderProtocol_Enum } from "../../../hasura/dist/graphql";
import { PERCENTAGE_BASE, TIP_RECIPIENT } from "../../../shared/src/configs/app";

export const useSwap = () => {
  const { data: signer } = useSigner();
  const { address } = useAccount();

  const offer = async (
    protocol: OrderProtocol_Enum,
    direction: OrderDirection_Enum,
    chainId: string,
    contractAddress: string,
    tokenId: string,
    price: string,
    tip: string
  ) => {
    if (!signer || !address) {
      return;
    }
    const provider = signer.provider as ethers.providers.JsonRpcProvider;
    const sdk = new KaguraSDK(provider);
    const { signedOrder } = await sdk.order.offer(
      protocol,
      direction,
      {
        contractAddress: contractAddress,
        tokenId: tokenId,
      },
      {
        amount: ethers.utils.parseEther(price).toString(),
      },
      address,
      [{ recipient: TIP_RECIPIENT, basisPoints: Number(tip) * PERCENTAGE_BASE }]
    );
    const { data } = await axios.post("/api/order/create", {
      protocol,
      direction,
      chainId,
      contractAddress,
      tokenId,
      signedOrder,
    });
    return data.id as string;
  };

  const cancel = async (protocol: OrderProtocol_Enum, signedOrder: SignedOrder) => {
    if (!signer || !address) {
      return;
    }
    const provider = signer.provider as ethers.providers.JsonRpcProvider;
    const sdk = new KaguraSDK(provider);
    await sdk.order.cancel(protocol, signedOrder);
  };

  const fulfill = async (protocol: OrderProtocol_Enum, signedOrder: SignedOrder) => {
    if (!signer || !address) {
      return;
    }
    const provider = signer.provider as ethers.providers.JsonRpcProvider;
    const sdk = new KaguraSDK(provider);
    await sdk.order.fulfill(protocol, signedOrder, address);
  };

  return { offer, cancel, fulfill };
};
