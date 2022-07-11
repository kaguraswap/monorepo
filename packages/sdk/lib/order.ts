import { Seaport } from "@opensea/seaport-js";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { CreateInputItem, OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { ERC721OrderStructSerialized, NftSwapV4 as ZeroEx, SignedERC721OrderStruct } from "@traderxyz/nft-swap-sdk";
import { ethers } from "ethers";

import { OrderDirection, OrderFee, OrderType, SignedOrder } from "../../common/entities/order";
import { INVALID_ARGUMENT } from "../../common/utils/error";

export interface Overrides {
  seaport?: string;
  zeroEx?: string;
}

export class Order {
  private _provider: ethers.providers.JsonRpcProvider;
  private _seaport: Seaport;
  private _overriddenZeroExContract?: string;

  constructor(provider: ethers.providers.JsonRpcProvider, overrides?: Overrides) {
    this._provider = provider;
    this._seaport = new Seaport(this._provider, {
      overrides: {
        contractAddress: overrides?.seaport,
      },
    });
    this._overriddenZeroExContract = overrides?.zeroEx;
  }

  private _getZeroEx = async (account?: string) => {
    const signer = await this._provider.getSigner(account);
    const { chainId } = await this._provider.getNetwork();
    return new ZeroEx(this._provider, signer, chainId, {
      zeroExExchangeProxyContractAddress: this._overriddenZeroExContract,
    });
  };

  public hash = async (type: OrderType, signedOrder: SignedOrder) => {
    if (type === "seaport") {
      signedOrder = signedOrder as OrderWithCounter;
      return this._seaport.getOrderHash(signedOrder.parameters);
    } else {
      const order = signedOrder as ERC721OrderStructSerialized;
      const zeroEx = await this._getZeroEx();
      return zeroEx.getOrderHash(order);
    }
  };

  public create = async (
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
    fees: OrderFee[]
  ) => {
    if (type === "seaport") {
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
      const { executeAllActions } = await this._seaport.createOrder({ ...order, fees }, offerer);
      const signedOrder = await executeAllActions();
      return { signedOrder };
    } else {
      if (!currencyItem.contractAddress) {
        throw new Error(INVALID_ARGUMENT);
      }
      const zeroEx = await this._getZeroEx(offerer);
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

  public validate = async (type: OrderType, signedOrder: SignedOrder) => {
    if (type === "seaport") {
      signedOrder = signedOrder as OrderWithCounter;
      return await this._seaport
        .validate([signedOrder], signedOrder.parameters.offerer)
        .callStatic()
        .catch(() => false);
    } else {
      signedOrder = signedOrder as SignedERC721OrderStruct;
      const zeroEx = await this._getZeroEx();
      const status = await zeroEx.getOrderStatus(signedOrder);
      return status === 1;
    }
  };

  public cancel = async (type: OrderType, signedOrder: SignedOrder) => {
    if (type === "seaport") {
      signedOrder = signedOrder as OrderWithCounter;
      await this._seaport.cancelOrders([signedOrder.parameters], signedOrder.parameters.offerer).transact();
    } else {
      signedOrder = signedOrder as SignedERC721OrderStruct;
      const zeroEx = await this._getZeroEx(signedOrder.maker);
      await zeroEx.cancelOrder(signedOrder.nonce, "ERC721");
    }
  };

  public fulfill = async (type: OrderType, signedOrder: SignedOrder, fulfiller: string) => {
    if (type === "seaport") {
      signedOrder = signedOrder as OrderWithCounter;
      const { executeAllActions } = await this._seaport.fulfillOrders({
        fulfillOrderDetails: [{ order: signedOrder }],
        accountAddress: fulfiller,
      });
      await executeAllActions();
    } else {
      signedOrder = signedOrder as SignedERC721OrderStruct;
      const zeroEx = await this._getZeroEx(fulfiller);
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
}
