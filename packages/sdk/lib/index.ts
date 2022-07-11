import { Seaport } from "@opensea/seaport-js";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { CreateInputItem, OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { NftSwapV4 as ZeroEx, SignedERC721OrderStruct } from "@traderxyz/nft-swap-sdk";
import { ethers } from "ethers";

import { OrderDirection, OrderFee, OrderType, SignedOrder } from "../../common/entities/order";
import { INVALID_ARGUMENT } from "../../common/utils/error";

export const createOrder = async (
  provider: ethers.providers.JsonRpcProvider,
  type: OrderType,
  direction: OrderDirection,
  erc721Item: {
    contractAddress: string;
    tokenId: string;
  },
  currencyItem: {
    contractAddress?: string;
    amount: string;
  },
  offerer: string,
  fees: OrderFee[],
  overrides?: string
) => {
  if (type === "seaport") {
    const seaport = new Seaport(provider, {
      overrides: {
        contractAddress: overrides,
      },
    });
    const erc721ItemAdjusted: CreateInputItem = {
      itemType: ItemType.ERC721,
      token: erc721Item.contractAddress,
      identifier: erc721Item.tokenId,
    };
    const erc20ItemAdjusted: CreateInputItem = {
      token: currencyItem.contractAddress,
      amount: currencyItem.amount,
    };
    const order =
      direction === "sell"
        ? {
            offer: [erc721ItemAdjusted],
            consideration: [{ ...erc20ItemAdjusted, recipient: offerer }],
          }
        : {
            offer: [erc20ItemAdjusted],
            consideration: [{ ...erc721ItemAdjusted, recipient: offerer }],
          };
    const { executeAllActions } = await seaport.createOrder({ ...order, fees }, offerer);
    const signedOrder = await executeAllActions();
    return { signedOrder };
  } else {
    if (!currencyItem.contractAddress) {
      throw new Error(INVALID_ARGUMENT);
    }
    const signer = await provider.getSigner(offerer);
    const { chainId } = await provider.getNetwork();
    const zeroEx = new ZeroEx(provider, signer, chainId, {
      zeroExExchangeProxyContractAddress: overrides,
    });
    const erc721ItemAdjusted = {
      type: "ERC721" as const,
      tokenAddress: erc721Item.contractAddress,
      tokenId: erc721Item.tokenId,
    };
    const currencyItemAdjusted = {
      type: "ERC20" as const,
      tokenAddress: currencyItem.contractAddress,
      amount: currencyItem.amount,
    };
    const item = direction === "sell" ? erc721ItemAdjusted : currencyItemAdjusted;
    const { contractApproved } = await zeroEx.loadApprovalStatus(item, offerer);
    if (!contractApproved) {
      const approvalTx = await zeroEx.approveTokenOrNftByAsset(item, offerer);
      await approvalTx.wait();
    }
    const order = zeroEx.buildNftAndErc20Order(erc721ItemAdjusted, currencyItemAdjusted, direction, offerer);
    const signedOrder = await zeroEx.signOrder(order);
    return { signedOrder };
  }
};

export const fulfillOrder = async (
  provider: ethers.providers.JsonRpcProvider,
  type: OrderType,
  signedOrder: SignedOrder,
  fulfiller: string,
  overrides?: string
) => {
  if (type === "seaport") {
    signedOrder = signedOrder as OrderWithCounter;
    const seaport = new Seaport(provider, {
      overrides: {
        contractAddress: overrides,
      },
    });
    const { executeAllActions } = await seaport.fulfillOrders({
      fulfillOrderDetails: [{ order: signedOrder }],
      accountAddress: fulfiller,
    });
    await executeAllActions();
  } else {
    signedOrder = signedOrder as SignedERC721OrderStruct;
    const signer = await provider.getSigner(fulfiller);
    const { chainId } = await provider.getNetwork();
    const zeroEx = new ZeroEx(provider, signer, chainId, {
      zeroExExchangeProxyContractAddress: overrides,
    });
    const item =
      signedOrder.direction === 0
        ? {
            type: "ERC20" as const,
            tokenAddress: signedOrder.erc20Token,
            amount: String(signedOrder.erc20TokenAmount),
          }
        : {
            type: "ERC721" as const,
            tokenAddress: signedOrder.erc721Token,
            tokenId: String(signedOrder.erc721TokenId),
          };
    const { contractApproved } = await zeroEx.loadApprovalStatus(item, fulfiller);
    if (!contractApproved) {
      const approvalTx = await zeroEx.approveTokenOrNftByAsset(item, fulfiller);
      await approvalTx.wait();
    }
    const tx = await zeroEx.fillSignedOrder(signedOrder);
    await zeroEx.awaitTransactionHash(tx.hash);
  }
};
