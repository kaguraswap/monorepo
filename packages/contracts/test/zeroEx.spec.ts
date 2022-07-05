import { expect } from "chai";

import { describeWithSeaportFixture } from "./utils/setup";

describeWithSeaportFixture(
  "ZeroEx",
  (fixture) => {
    it.skip("ERC721 <=> WETH", async function () {
      const { offerer, fulfiller, wethMock, erc721Mock, zeroEx } = fixture;
      const tokenId = "0";
      const amount = "10000";
      await erc721Mock.mint(offerer.address, tokenId);
      await wethMock.connect(fulfiller).deposit({ value: amount });
      const erc721 = {
        type: "ERC721" as const,
        tokenAddress: erc721Mock.address,
        tokenId,
      };
      const weth = {
        type: "ERC20" as const,
        tokenAddress: wethMock.address,
        amount,
      };

      zeroEx.signer = offerer;
      const { contractApproved: erc721ContractApproved } = await zeroEx.loadApprovalStatus(erc721, offerer.address);
      if (!erc721ContractApproved) {
        const approvalTx = await zeroEx.approveTokenOrNftByAsset(erc721, offerer.address);
        await approvalTx.wait();
      }
      const order = zeroEx.buildOrder(erc721, weth, offerer.address);
      const signedOrder = await zeroEx.signOrder(order);

      zeroEx.signer = fulfiller;
      const { contractApproved: wethContractApproved } = await zeroEx.loadApprovalStatus(weth, fulfiller.address);
      if (!wethContractApproved) {
        const approvalTx = await zeroEx.approveTokenOrNftByAsset(weth, fulfiller.address);
        await approvalTx.wait();
      }
      const tx = await zeroEx.fillSignedOrder(signedOrder);
      await zeroEx.awaitTransactionHash(tx.hash);
      expect(await erc721Mock.ownerOf(tokenId)).to.equal(fulfiller.address);
      expect(await wethMock.balanceOf(offerer.address)).to.equal(amount);
    });

    it.skip("WETH <=> ERC721", async function () {
      const { offerer, fulfiller, wethMock, erc721Mock, zeroEx } = fixture;
      const tokenId = "0";
      const amount = "10000";
      await erc721Mock.mint(fulfiller.address, tokenId);
      await wethMock.connect(offerer).deposit({ value: amount });
      const erc721 = {
        type: "ERC721" as const,
        tokenAddress: erc721Mock.address,
        tokenId,
      };
      const weth = {
        type: "ERC20" as const,
        tokenAddress: wethMock.address,
        amount,
      };

      zeroEx.signer = offerer;
      const { contractApproved: wethContractApproved } = await zeroEx.loadApprovalStatus(weth, offerer.address);
      if (!wethContractApproved) {
        const approvalTx = await zeroEx.approveTokenOrNftByAsset(weth, fulfiller.address);
        await approvalTx.wait();
      }
      const order = zeroEx.buildOrder(weth, erc721, offerer.address);
      const signedOrder = await zeroEx.signOrder(order);

      zeroEx.signer = fulfiller;
      const { contractApproved: erc721ContractApproved } = await zeroEx.loadApprovalStatus(erc721, fulfiller.address);
      if (!erc721ContractApproved) {
        const approvalTx = await zeroEx.approveTokenOrNftByAsset(erc721, offerer.address);
        await approvalTx.wait();
      }
      const tx = await zeroEx.fillSignedOrder(signedOrder);
      await zeroEx.awaitTransactionHash(tx.hash);
      expect(await wethMock.balanceOf(fulfiller.address)).to.equal(amount);
      expect(await erc721Mock.ownerOf(tokenId)).to.equal(offerer.address);
    });
  },
  { zeroEx: true }
);
