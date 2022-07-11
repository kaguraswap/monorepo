import { expect } from "chai";
import { ethers } from "hardhat";

import { describeWithSeaportFixture } from "./utils/setup";

describeWithSeaportFixture(
  "SDK",
  (fixture) => {
    it("Seaport: ERC721 => ETH", async function () {
      const { sdk, offerer, fulfiller, erc721Mock, seaportContractAddress } = fixture;
      const tokenId = "0";
      const amount = "10000";
      await erc721Mock.mint(offerer.address, tokenId);
      const { signedOrder } = await sdk.order.create(
        "seaport",
        "sell",
        {
          contractAddress: erc721Mock.address,
          tokenId: tokenId,
        },
        {
          amount,
        },
        offerer.address,
        [],
        seaportContractAddress
      );
      const previousBalanceOfOfferer = await ethers.provider.getBalance(offerer.address);
      await sdk.order.fulfill("seaport", signedOrder, fulfiller.address, seaportContractAddress);
      expect(await erc721Mock.ownerOf(tokenId)).to.equal(fulfiller.address);
      expect(await ethers.provider.getBalance(offerer.address)).to.equal(previousBalanceOfOfferer.add(amount));
    });

    it("ZeroEx: ERC721 => ETH", async function () {
      const { sdk, offerer, fulfiller, erc20Mock, erc721Mock, zeroExContractAddress } = fixture;
      const tokenId = "0";
      const amount = "10000";
      await erc721Mock.mint(offerer.address, tokenId);
      await erc20Mock.mint(fulfiller.address, amount);
      const { signedOrder } = await sdk.order.create(
        "zeroEx",
        "sell",
        {
          contractAddress: erc721Mock.address,
          tokenId: tokenId,
        },
        {
          contractAddress: erc20Mock.address,
          amount,
        },
        offerer.address,
        [],
        zeroExContractAddress
      );
      const previousBalanceOfOfferer = await erc20Mock.balanceOf(offerer.address);
      await sdk.order.fulfill("zeroEx", signedOrder, fulfiller.address, zeroExContractAddress);
      expect(await erc721Mock.ownerOf(tokenId)).to.equal(fulfiller.address);
      expect(await erc20Mock.balanceOf(offerer.address)).to.equal(previousBalanceOfOfferer.add(amount));
    });
  },
  { seaport: true, zeroEx: true }
);
