import { Seaport } from "@opensea/seaport-js";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { NftSwapV4 as ZeroEx, SignedOrder } from "@traderxyz/nft-swap-sdk";
import { ethers } from "ethers";

import { OrderDirection, OrderFee, OrderType, RawOrder } from "../../common/entities/order";
import { NOT_IMPLEMENTED } from "../../functions/dist/common/utils/error";

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
  overrides?: {
    contractAddress: string;
  }
) => {
  if (type === "seaport") {
    const seaport = new Seaport(provider, {
      overrides,
    });
    const { executeAllActions } = await seaport.createOrder(
      direction === "sell"
        ? {
            offer: [
              {
                itemType: ItemType.ERC721,
                token: erc721Item.contractAddress,
                identifier: erc721Item.tokenId,
              },
            ],
            consideration: [
              {
                token: currencyItem.contractAddress,
                amount: currencyItem.amount,
                recipient: offerer,
              },
            ],
            fees,
          }
        : {
            offer: [
              {
                token: currencyItem.contractAddress,
                amount: currencyItem.amount,
              },
            ],
            consideration: [
              {
                itemType: ItemType.ERC721,
                token: erc721Item.contractAddress,
                identifier: erc721Item.tokenId,
                recipient: offerer,
              },
            ],
            fees,
          },
      offerer
    );

    const order = await executeAllActions();
    return { order };
  } else {
    const signer = await provider.getSigner();
    const zeroEx = new ZeroEx(provider, signer);

    if (!currencyItem.contractAddress) {
      throw new Error(NOT_IMPLEMENTED);
    }

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
    // const { contractApproved } = await zeroEx.loadApprovalStatus(item, offerer);

    // if (!contractApproved) {
    // const approvalTx = await zeroEx.approveTokenOrNftByAsset(item, offerer);
    // await approvalTx.wait();
    // }
    const _order = zeroEx.buildNftAndErc20Order(erc721ItemAdjusted, currencyItemAdjusted, direction, offerer);
    const order = await zeroEx.signOrder(_order);

    return { order };
  }
};

export const fulfillOrder = async (
  provider: ethers.providers.JsonRpcProvider,
  type: OrderType,
  order: RawOrder,
  fulfiller: string,
  overrides?: {
    contractAddress: string;
  }
) => {
  if (type === "seaport") {
    order = order as OrderWithCounter;
    const seaport = new Seaport(provider, {
      overrides,
    });
    const { executeAllActions } = await seaport.fulfillOrders({
      fulfillOrderDetails: [{ order }],
      accountAddress: fulfiller,
    });
    await executeAllActions();
  } else {
    const signer = await provider.getSigner();
    const _order = order as any;

    const asset = {
      type: "ERC20" as const,
      tokenAddress: _order.erc20Token,
      amount: _order.erc20TokenAmount,
    };
    const zeroEx = new ZeroEx(provider, signer);
    const { contractApproved } = await zeroEx.loadApprovalStatus(asset, fulfiller);
    if (!contractApproved) {
      const approvalTx = await zeroEx.approveTokenOrNftByAsset(asset, fulfiller);
      await approvalTx.wait();
    }
    const tx = await zeroEx.fillSignedOrder(_order);
    await zeroEx.awaitTransactionHash(tx.hash);
  }
};
