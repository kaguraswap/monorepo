import axios from "axios";
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";

import { TIP_RECIPIENT } from "../../../../../common/configs/app";
import { NFT } from "../../../../../common/entities/nft";
import { Order, OrderDirection, OrderType } from "../../../../../common/entities/order";
import { PERCENTAGE_BASE } from "../../../../../common/utils/constant";
import { KaguraSDK } from "../../../../../sdk/lib";

export const useSwap = () => {
  const [{ data: signer }] = useSigner();
  const [{ data: account }] = useAccount();

  const offer = async (protocol: OrderType, direction: OrderDirection, nft: NFT, price: string, tip: string) => {
    if (!signer || !account) {
      return;
    }
    const { address } = account;
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
    const { data } = await axios.post("http://localhost:3000/api/order/create", { type: "seaport", nft, signedOrder });
    return data as Order;
  };

  const fulfill = async (protocol: OrderType, signedOrder: OrderDirection) => {
    console.log("fulfill");
  };

  return { offer, fulfill };
};