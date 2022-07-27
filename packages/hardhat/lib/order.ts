import { Seaport } from "@opensea/seaport-js";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { CreateInputItem, OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { ERC721OrderStructSerialized, NftSwapV4 as ZeroEx, SignedERC721OrderStruct } from "@traderxyz/nft-swap-sdk";
import { ethers } from "ethers";

import { OrderDirection_Enum, OrderProtocol_Enum } from "../../hasura/dist/graphql";
import { error } from "../../shared/src/utils/error";
import { OrderFee, SignedOrder } from "../types/order";

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

  public hash = async (protocol: OrderProtocol_Enum, signedOrder: SignedOrder) => {
    if (protocol === OrderProtocol_Enum.Seaport) {
      signedOrder = <OrderWithCounter>signedOrder;
      return this._seaport.getOrderHash(signedOrder.parameters);
    } else {
      const order = <ERC721OrderStructSerialized>signedOrder;
      const zeroEx = await this._getZeroEx();
      return await zeroEx.getOrderHash(order);
    }
  };

  public offer = async (
    protocol: OrderProtocol_Enum,
    direction: OrderDirection_Enum,
    erc721Item: {
      contractAddress: string;
      tokenId: string;
    },
    currencyItem: {
      contractAddress?: string;
      amount: string;
    },
    offerer: string,
    fees?: OrderFee[]
  ) => {
    if (protocol === OrderProtocol_Enum.Seaport) {
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
        direction === OrderDirection_Enum.Sell
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
        throw new Error(error.invalidArgument.message);
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
      const item = direction === OrderDirection_Enum.Sell ? erc721ItemAdjusted : currencyItemAdjusted;
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

  public validate = async (protocol: OrderProtocol_Enum, signedOrder: SignedOrder) => {
    if (protocol === OrderProtocol_Enum.Seaport) {
      signedOrder = <OrderWithCounter>signedOrder;
      return await this._seaport
        .validate([signedOrder], signedOrder.parameters.offerer)
        .callStatic()
        .catch(() => false);
    } else {
      signedOrder = <SignedERC721OrderStruct>signedOrder;
      const zeroEx = await this._getZeroEx();
      const status = await zeroEx.getOrderStatus(signedOrder);
      return status === 1;
    }
  };

  public cancel = async (protocol: OrderProtocol_Enum, signedOrder: SignedOrder) => {
    if (protocol === OrderProtocol_Enum.Seaport) {
      signedOrder = <OrderWithCounter>signedOrder;
      await this._seaport.cancelOrders([signedOrder.parameters], signedOrder.parameters.offerer).transact();
    } else {
      signedOrder = <SignedERC721OrderStruct>signedOrder;
      const zeroEx = await this._getZeroEx(signedOrder.maker);
      await zeroEx.cancelOrder(signedOrder.nonce, "ERC721");
    }
  };

  public fulfill = async (protocol: OrderProtocol_Enum, signedOrder: SignedOrder, fulfiller: string) => {
    if (protocol === OrderProtocol_Enum.Seaport) {
      signedOrder = <OrderWithCounter>signedOrder;
      const { executeAllActions } = await this._seaport.fulfillOrders({
        fulfillOrderDetails: [{ order: signedOrder }],
        accountAddress: fulfiller,
      });
      const tx = await executeAllActions();
      return tx.hash;
    } else {
      signedOrder = <SignedERC721OrderStruct>signedOrder;
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
      return tx.hash;
    }
  };
}
