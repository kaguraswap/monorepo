import { ItemType } from "@opensea/seaport-js/lib/constants";
import { expect } from "chai";
import { ethers } from "hardhat";

import { describeWithSeaportFixture } from "./utils/setup";

describeWithSeaportFixture(
  "Seaport",
  (fixture) => {
    it("ERC721 => ETH", async function () {
      const { offerer, fulfiller, erc721Mock, seaport } = fixture;
      const tokenId = "0";
      const amount = "10000";

      await erc721Mock.mint(offerer.address, tokenId);
      const { executeAllActions: executeAllOfferActions } = await seaport.createOrder(
        {
          offer: [
            {
              itemType: ItemType.ERC721,
              token: erc721Mock.address,
              identifier: tokenId,
            },
          ],
          consideration: [
            {
              amount,
              recipient: offerer.address,
            },
          ],
        },
        offerer.address
      );
      const order = await executeAllOfferActions();
      const { executeAllActions: executeAllFulfillActions } = await seaport.fulfillOrders({
        fulfillOrderDetails: [{ order }],
        accountAddress: fulfiller.address,
      });
      const previousBalanceOfOfferer = await ethers.provider.getBalance(offerer.address);
      await executeAllFulfillActions();
      expect(await erc721Mock.ownerOf(tokenId)).to.equal(fulfiller.address);
      expect(await ethers.provider.getBalance(offerer.address)).to.equal(previousBalanceOfOfferer.add(amount));
    });
  },
  { seaport: true }
);
