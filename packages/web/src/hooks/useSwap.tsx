import axios from "axios";
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";

import { TIP_RECIPIENT } from "../../../common/configs/app";
import { NFT } from "../../../common/entities/nft";
import { OrderDirection, OrderType, SignedOrder } from "../../../common/entities/order";
import { PERCENTAGE_BASE } from "../../../common/utils/constant";
import { KaguraSDK } from "../../../sdk/lib";

export const useSwap = () => {
  const { data: signer } = useSigner();
  const { address } = useAccount();

  const offer = async (protocol: OrderType, direction: OrderDirection, nft: NFT, price: string, tip: string) => {
    if (!signer || !address) {
      return;
    }
    const provider = signer.provider as ethers.providers.JsonRpcProvider;
    const sdk = new KaguraSDK(provider);
    const { signedOrder } = await sdk.order.offer(
      protocol,
      direction,
      {
        contractAddress: nft.contractAddress,
        tokenId: nft.tokenId,
      },
      {
        amount: ethers.utils.parseEther(price).toString(),
      },
      address,
      [{ recipient: TIP_RECIPIENT, basisPoints: Number(tip) * PERCENTAGE_BASE }]
    );
    const { data } = await axios.post("http://localhost:3000/api/order/create", {
      protocol,
      direction,
      nft,
      signedOrder,
    });
    return data.id as string;
  };

  const cancel = async (protocol: OrderType, signedOrder: SignedOrder) => {
    if (!signer || !address) {
      return;
    }
    const provider = signer.provider as ethers.providers.JsonRpcProvider;
    const sdk = new KaguraSDK(provider);
    await sdk.order.cancel(protocol, signedOrder);
  };

  const fulfill = async (protocol: OrderType, signedOrder: SignedOrder) => {
    if (!signer || !address) {
      return;
    }
    const provider = signer.provider as ethers.providers.JsonRpcProvider;
    const sdk = new KaguraSDK(provider);
    await sdk.order.fulfill(protocol, signedOrder, address);
  };

  return { offer, cancel, fulfill };
};
