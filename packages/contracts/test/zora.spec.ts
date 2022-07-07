import { expect } from "chai";
import { ethers } from "hardhat";

import { describeWithSeaportFixture } from "./utils/setup";

describeWithSeaportFixture(
  "Zora",
  (fixture) => {
    it.skip("ERC721 <=> ETH", async function () {
      const { offerer, fulfiller, erc721Mock } = fixture;
      const tokenId = "0";
      const amount = "10000";
      await erc721Mock.mint(offerer.address, tokenId);
      const previousBalanceOfOfferer = await ethers.provider.getBalance(offerer.address);

      // TODO: implement

      expect(await erc721Mock.ownerOf(tokenId)).to.equal(fulfiller.address);
      expect(await ethers.provider.getBalance(offerer.address)).to.equal(previousBalanceOfOfferer.add(amount));
    });

    it.skip("WETH <=> ERC721", async function () {
      const { offerer, fulfiller, erc721Mock, wethMock } = fixture;
      const tokenId = "0";
      const amount = "10000";
      await erc721Mock.mint(fulfiller.address, tokenId);
      await wethMock.connect(offerer).deposit({ value: amount });

      // TODO: implement here

      expect(await wethMock.balanceOf(fulfiller.address)).to.equal(amount);
      expect(await erc721Mock.ownerOf(tokenId)).to.equal(offerer.address);
    });
  },
  { zora: true }
);
