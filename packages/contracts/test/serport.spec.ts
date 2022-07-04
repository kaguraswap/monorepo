import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

import { ItemType } from "../lib/seaport/constant";
import { describeWithSeaportFixture } from "./utils/setup";

describeWithSeaportFixture("Seaport", (fixture) => {
  it("ERC721 <=> ETH", async function () {
    const [offerer, fulfiller] = await ethers.getSigners();
    const { erc721Mock, seaport } = fixture;
    const tokenId = "0";
    await erc721Mock.mint(offerer.address, tokenId);
    const price = parseEther("1").toString();
    const { executeAllActions: executeAllOfferActions } = await seaport.createOrder({
      offer: [
        {
          itemType: ItemType.ERC721,
          token: erc721Mock.address,
          identifier: tokenId,
        },
      ],
      consideration: [
        {
          amount: price,
          recipient: offerer.address,
        },
      ],
    });
    const order = await executeAllOfferActions();
    const { executeAllActions: executeAllFulfillActions } = await seaport.fulfillOrders({
      fulfillOrderDetails: [{ order }],
      accountAddress: fulfiller.address,
    });
    const previousBalanceOfOfferer = await ethers.provider.getBalance(offerer.address);
    await executeAllFulfillActions();
    expect(await erc721Mock.ownerOf(tokenId)).to.equal(fulfiller.address);
    expect(await ethers.provider.getBalance(offerer.address)).to.equal(previousBalanceOfOfferer.add(price));
  });

  it("ERC721 <=> ERC20", async function () {
    const [offerer, fulfiller] = await ethers.getSigners();
    const { erc721Mock, erc20Mock, seaport } = fixture;
    const tokenId = "0";
    const price = parseEther("1").toString();
    await erc721Mock.mint(offerer.address, tokenId);
    await erc20Mock.mint(fulfiller.address, price);
    const { executeAllActions: executeAllOfferActions } = await seaport.createOrder({
      offer: [
        {
          itemType: ItemType.ERC721,
          token: erc721Mock.address,
          identifier: tokenId,
        },
      ],
      consideration: [
        {
          token: erc20Mock.address,
          amount: price,
        },
      ],
    });
    const order = await executeAllOfferActions();
    const { executeAllActions: executeAllFulfillActions } = await seaport.fulfillOrders({
      fulfillOrderDetails: [{ order }],
      accountAddress: fulfiller.address,
    });
    await executeAllFulfillActions();
    expect(await erc721Mock.ownerOf(tokenId)).to.equal(fulfiller.address);
    expect(await erc20Mock.balanceOf(offerer.address)).to.equal(price);
  });

  it("ERC1155 <=> ETH", async function () {
    const [offerer, fulfiller] = await ethers.getSigners();
    const { erc1155Mock, seaport } = fixture;
    const tokenId = "0";
    const amount = "1";
    const price = parseEther("1").toString();
    await erc1155Mock.mint(offerer.address, tokenId, amount);
    const { executeAllActions: executeAllOfferActions } = await seaport.createOrder({
      offer: [
        {
          itemType: ItemType.ERC1155,
          token: erc1155Mock.address,
          identifier: tokenId,
          amount: amount,
        },
      ],
      consideration: [
        {
          amount: price,
          recipient: offerer.address,
        },
      ],
    });
    const order = await executeAllOfferActions();
    const { executeAllActions: executeAllFulfillActions } = await seaport.fulfillOrders({
      fulfillOrderDetails: [{ order }],
      accountAddress: fulfiller.address,
    });
    const previousBalanceOfOfferer = await ethers.provider.getBalance(offerer.address);
    await executeAllFulfillActions();
    expect(await erc1155Mock.balanceOf(fulfiller.address, tokenId)).to.equal(amount);
    expect(await ethers.provider.getBalance(offerer.address)).to.equal(previousBalanceOfOfferer.add(price));
  });

  it("ERC1155 <=> ERC20", async function () {
    const [offerer, fulfiller] = await ethers.getSigners();
    const { erc20Mock, erc1155Mock, seaport } = fixture;
    const tokenId = "0";
    const amount = "1";
    const price = parseEther("1").toString();
    await erc1155Mock.mint(offerer.address, tokenId, amount);
    await erc20Mock.mint(fulfiller.address, price);
    const { executeAllActions: executeAllOfferActions } = await seaport.createOrder({
      offer: [
        {
          itemType: ItemType.ERC1155,
          token: erc1155Mock.address,
          identifier: tokenId,
          amount: amount,
        },
      ],
      consideration: [
        {
          token: erc20Mock.address,
          amount: price,
        },
      ],
    });
    const order = await executeAllOfferActions();
    const { executeAllActions: executeAllFulfillActions } = await seaport.fulfillOrders({
      fulfillOrderDetails: [{ order }],
      accountAddress: fulfiller.address,
    });
    await executeAllFulfillActions();
    expect(await erc1155Mock.balanceOf(fulfiller.address, tokenId)).to.equal(amount);
    expect(await erc20Mock.balanceOf(offerer.address)).to.equal(price);
  });
});
