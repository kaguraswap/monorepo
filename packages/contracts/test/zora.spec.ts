import rinkebyZoraAddresses from "@zoralabs/v3/dist/addresses/4.json"; // Mainnet addresses, 4.json would be Rinkeby Testnet
import { AsksV11__factory as AsksV11Factory } from "@zoralabs/v3/dist/typechain/factories/AsksV11__factory";
import { expect } from "chai";
import { ethers } from "hardhat";

import { describeWithSeaportFixture } from "./utils/setup";

describeWithSeaportFixture(
  "Zora",
  (fixture) => {
    it("ERC721 <=> ETH", async function () {
      const { offerer, fulfiller, resistrar, erc721Mock, wethMock, zora } = fixture;
      const tokenId = "0";
      const amount = "10";
      await erc721Mock.mint(offerer.address, tokenId);
      const previousBalanceOfOfferer = await ethers.provider.getBalance(offerer.address);

      const ZoraModuleManagerFactory = await ethers.getContractFactory("ZoraModuleManager");
      const ZoraModuleManager = await ZoraModuleManagerFactory.deploy(resistrar.address, wethMock.address);
      await ZoraModuleManager.deployed();

      const ERC20TransferHelperFactory = await ethers.getContractFactory("ERC20TransferHelper");
      const ERC20TransferHelper = await ERC20TransferHelperFactory.deploy(ZoraModuleManager.address);
      await ERC20TransferHelper.deployed();

      const ERC721TransferHelperFactory = await ethers.getContractFactory("ERC721TransferHelper");
      const ERC721TransferHelper = await ERC721TransferHelperFactory.deploy(ZoraModuleManager.address);
      await ERC721TransferHelper.deployed();

      const AsksV11 = await ethers.getContractFactory("AsksV1_1");
      const AsksV11Contract = await AsksV11.deploy(ERC20TransferHelper.address, ERC721TransferHelper.address, );
      await AsksV11Contract.deployed();

      const erc721TransferHelperAddress = ERC721TransferHelper.address;
      const approved = await erc721Mock.isApprovedForAll(offerer.address, erc721TransferHelperAddress);
      if (approved === false) {
        await erc721Mock.connect(offerer).setApprovalForAll(erc721TransferHelperAddress, true);
      }
      // TODO: implement
      const askModuleContract = AsksV11Factory.connect(AsksV11Contract.address, offerer);
      const askPrice = ethers.utils.parseEther(amount);
      const ownerAddress = offerer.address; // Owner of the assets
      const findersFeeBps = "0"; // 2% Finders Fee (in BPS)
      console.log(erc721Mock.address);

      const approvedchack = await erc721Mock.isApprovedForAll(offerer.address, erc721TransferHelperAddress);
      console.log(approvedchack, "approvedchack");
      const order = await askModuleContract.connect(offerer).createAsk(
        erc721Mock.address,
        tokenId,
        askPrice,
        "0x0000000000000000000000000000000000000000", // 0 address for ETH sale
        ownerAddress,
        findersFeeBps
      );
      console.log(order, "order");

      const askModuleContractFill = AsksV11Factory.connect(rinkebyZoraAddresses.AsksV1_1, fulfiller);
      const tx = await askModuleContractFill.fillAsk(
        erc721Mock.address,
        tokenId, // Token Id
        "0x0000000000000000000000000000000000000000", // 0 address for ETH sale
        askPrice,
        fulfiller.address
      );
      console.log(tx, "tx");

      expect(await erc721Mock.ownerOf(tokenId)).to.equal(fulfiller.address);
      expect(await ethers.provider.getBalance(offerer.address)).to.equal(previousBalanceOfOfferer.add(amount));
    });

    it.skip("WETH <=> ERC721", async function () {
      const { offerer, fulfiller, erc721Mock, wethMock, zora } = fixture;
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
