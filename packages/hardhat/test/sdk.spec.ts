import { expect } from "chai";
import { ethers } from "hardhat";

import { OrderDirection_Enum, OrderProtocol_Enum } from "../../hasura/dist/graphql";
import { describeWithSeaportFixture } from "./utils/setup";

describeWithSeaportFixture(
  "SDK",
  (fixture) => {
    it("Seaport: Fulfill ERC721 => ETH", async function () {
      const { sdk, offerer, fulfiller, erc721Mock } = fixture;
      const tokenId = "0";
      const amount = "10000";
      await erc721Mock.mint(offerer.address, tokenId);
      const { signedOrder } = await sdk.order.offer(
        OrderProtocol_Enum.Seaport,
        OrderDirection_Enum.Sell,
        {
          contractAddress: erc721Mock.address,
          tokenId: tokenId,
        },
        {
          amount,
        },
        offerer.address,
        []
      );
      expect(await sdk.order.validate(OrderProtocol_Enum.Seaport, signedOrder)).to.equal(true);
      const previousBalanceOfOfferer = await ethers.provider.getBalance(offerer.address);
      await sdk.order.fulfill(OrderProtocol_Enum.Seaport, signedOrder, fulfiller.address);
      expect(await sdk.order.validate(OrderProtocol_Enum.Seaport, signedOrder)).to.equal(false);
      expect(await ethers.provider.getBalance(offerer.address)).to.equal(previousBalanceOfOfferer.add(amount));
      expect(await erc721Mock.ownerOf(tokenId)).to.equal(fulfiller.address);
    });

    it("Seaport: Fulfill ERC20 => ERC721", async function () {
      const { sdk, offerer, erc20Mock, fulfiller, erc721Mock } = fixture;
      const tokenId = "0";
      const amount = "10000";
      await erc20Mock.mint(offerer.address, amount);
      await erc721Mock.mint(fulfiller.address, tokenId);
      const { signedOrder } = await sdk.order.offer(
        OrderProtocol_Enum.Seaport,
        OrderDirection_Enum.Buy,
        {
          contractAddress: erc721Mock.address,
          tokenId: tokenId,
        },
        {
          contractAddress: erc20Mock.address,
          amount,
        },
        offerer.address,
        []
      );
      expect(await sdk.order.validate(OrderProtocol_Enum.Seaport, signedOrder)).to.equal(true);
      await sdk.order.fulfill(OrderProtocol_Enum.Seaport, signedOrder, fulfiller.address);
      expect(await sdk.order.validate(OrderProtocol_Enum.Seaport, signedOrder)).to.equal(false);
      expect(await erc721Mock.ownerOf(tokenId)).to.equal(offerer.address);
      expect(await erc20Mock.balanceOf(fulfiller.address)).to.equal(amount);
    });

    it("Seaport: Cancel", async function () {
      const { sdk, offerer, erc721Mock } = fixture;
      const tokenId = "0";
      const amount = "10000";
      await erc721Mock.mint(offerer.address, tokenId);
      const { signedOrder } = await sdk.order.offer(
        OrderProtocol_Enum.Seaport,
        OrderDirection_Enum.Buy,
        {
          contractAddress: erc721Mock.address,
          tokenId: tokenId,
        },
        {
          amount,
        },
        offerer.address,
        []
      );
      expect(await sdk.order.validate(OrderProtocol_Enum.Seaport, signedOrder)).to.equal(true);
      await sdk.order.cancel(OrderProtocol_Enum.Seaport, signedOrder);
      expect(await sdk.order.validate(OrderProtocol_Enum.Seaport, signedOrder)).to.equal(false);
    });

    it("ZeroEx: Fulfill ERC721 => ETH", async function () {
      const { sdk, offerer, fulfiller, erc20Mock, erc721Mock } = fixture;
      const tokenId = "0";
      const amount = "10000";
      await erc20Mock.mint(fulfiller.address, amount);
      await erc721Mock.mint(offerer.address, tokenId);
      const { signedOrder } = await sdk.order.offer(
        OrderProtocol_Enum.ZeroEx,
        OrderDirection_Enum.Sell,
        {
          contractAddress: erc721Mock.address,
          tokenId: tokenId,
        },
        {
          contractAddress: erc20Mock.address,
          amount,
        },
        offerer.address,
        []
      );
      const previousBalanceOfOfferer = await erc20Mock.balanceOf(offerer.address);
      expect(await sdk.order.validate(OrderProtocol_Enum.ZeroEx, signedOrder)).to.equal(true);
      await sdk.order.fulfill(OrderProtocol_Enum.ZeroEx, signedOrder, fulfiller.address);
      expect(await sdk.order.validate(OrderProtocol_Enum.ZeroEx, signedOrder)).to.equal(false);
      expect(await erc20Mock.balanceOf(offerer.address)).to.equal(previousBalanceOfOfferer.add(amount));
      expect(await erc721Mock.ownerOf(tokenId)).to.equal(fulfiller.address);
    });

    it("ZeroEx: Fulfill ERC20 => ERC721", async function () {
      const { sdk, offerer, fulfiller, erc20Mock, erc721Mock } = fixture;
      const tokenId = "0";
      const amount = "10000";
      await erc20Mock.mint(offerer.address, amount);
      await erc721Mock.mint(fulfiller.address, tokenId);
      const { signedOrder } = await sdk.order.offer(
        OrderProtocol_Enum.ZeroEx,
        OrderDirection_Enum.Buy,
        {
          contractAddress: erc721Mock.address,
          tokenId: tokenId,
        },
        {
          contractAddress: erc20Mock.address,
          amount,
        },
        offerer.address,
        []
      );
      expect(await sdk.order.validate(OrderProtocol_Enum.ZeroEx, signedOrder)).to.equal(true);
      await sdk.order.fulfill(OrderProtocol_Enum.ZeroEx, signedOrder, fulfiller.address);
      expect(await sdk.order.validate(OrderProtocol_Enum.ZeroEx, signedOrder)).to.equal(false);
      expect(await erc721Mock.ownerOf(tokenId)).to.equal(offerer.address);
      expect(await erc20Mock.balanceOf(fulfiller.address)).to.equal(amount);
    });

    it("ZeroEx: Cancel", async function () {
      const { sdk, offerer, erc20Mock, erc721Mock } = fixture;
      const tokenId = "0";
      const amount = "10000";
      await erc721Mock.mint(offerer.address, tokenId);
      const { signedOrder } = await sdk.order.offer(
        OrderProtocol_Enum.ZeroEx,
        OrderDirection_Enum.Sell,
        {
          contractAddress: erc721Mock.address,
          tokenId: tokenId,
        },
        {
          contractAddress: erc20Mock.address,
          amount,
        },
        offerer.address,
        []
      );
      expect(await sdk.order.validate(OrderProtocol_Enum.ZeroEx, signedOrder)).to.equal(true);
      await sdk.order.cancel(OrderProtocol_Enum.ZeroEx, signedOrder);
      expect(await sdk.order.validate(OrderProtocol_Enum.ZeroEx, signedOrder)).to.equal(false);
    });
  },
  { seaport: true, zeroEx: true }
);
