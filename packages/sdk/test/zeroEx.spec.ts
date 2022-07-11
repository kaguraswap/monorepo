import { expect } from "chai";

import { describeWithSeaportFixture } from "./utils/setup";

describeWithSeaportFixture(
  "ZeroEx",
  (fixture) => {
    it("ERC721 => ERC20", async function () {
      const { offerer, fulfiller, erc721Mock, erc20Mock, zeroEx } = fixture;
      const tokenId = "0";
      const amount = "10000";
      await erc721Mock.mint(offerer.address, tokenId);
      await erc20Mock.mint(fulfiller.address, amount);
      const erc721 = {
        type: "ERC721" as const,
        tokenAddress: erc721Mock.address,
        tokenId,
      };
      const erc20 = {
        type: "ERC20" as const,
        tokenAddress: erc20Mock.address,
        amount,
      };

      const { contractApproved: erc721ContractApproved } = await zeroEx.offerer.loadApprovalStatus(
        erc721,
        offerer.address
      );
      if (!erc721ContractApproved) {
        const approvalTx = await zeroEx.offerer.approveTokenOrNftByAsset(erc721, offerer.address);
        await approvalTx.wait();
      }
      const order = zeroEx.offerer.buildOrder(erc721, erc20, offerer.address);
      const signedOrder = await zeroEx.offerer.signOrder(order);

      const { contractApproved: erc20ContractApproved } = await zeroEx.fulfiller.loadApprovalStatus(
        erc20,
        fulfiller.address
      );
      if (!erc20ContractApproved) {
        const approvalTx = await zeroEx.fulfiller.approveTokenOrNftByAsset(erc20, fulfiller.address);
        await approvalTx.wait();
      }

      const tx = await zeroEx.fulfiller.fillSignedOrder(signedOrder);
      await zeroEx.fulfiller.awaitTransactionHash(tx.hash);
      expect(await erc721Mock.ownerOf(tokenId)).to.equal(fulfiller.address);
      expect(await erc20Mock.balanceOf(offerer.address)).to.equal(amount);
    });
  },
  { zeroEx: true }
);
