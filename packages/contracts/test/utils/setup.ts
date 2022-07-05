import { fullMigrateAsync } from "@0x/contracts-zero-ex";
import { RPCSubprovider, Web3ProviderEngine } from "@0x/subproviders";
import { providerUtils } from "@0x/utils";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Seaport } from "@opensea/seaport-js";
import { NftSwapV4 as ZeroEx } from "@traderxyz/nft-swap-sdk";
import { ZDK } from "@zoralabs/zdk";
import { ethers } from "hardhat";

import { TEST_CHAIN_ID } from "../../lib/constant";
import { ERC20Mock, ERC721Mock, ERC1155Mock, WETHMock } from "../../typechain";

interface Fixture {
  owner: SignerWithAddress;
  offerer: SignerWithAddress;
  fulfiller: SignerWithAddress;
  attacker: SignerWithAddress;
  wethMock: WETHMock;
  erc20Mock: ERC20Mock;
  erc721Mock: ERC721Mock;
  erc1155Mock: ERC1155Mock;
  seaport: Seaport;
  zeroEx: ZeroEx;
  zora: ZDK;
}

interface Target {
  seaport?: boolean;
  zeroEx?: boolean;
  zora?: boolean;
  kagura?: boolean;
}

export const describeWithSeaportFixture = (name: string, suiteCb: (fixture: Fixture) => unknown, target: Target) => {
  describe(name, () => {
    const fixture: Partial<Fixture> = {};

    beforeEach(async () => {
      const [owner, offerer, fulfiller, attacker] = await ethers.getSigners();

      const provider = ethers.provider;

      const WETHMockFactory = await ethers.getContractFactory("WETHMock");
      const wethMock = await WETHMockFactory.deploy();
      await wethMock.deployed();

      if (target.seaport) {
        const ConduitControllerFactory = await ethers.getContractFactory("ConduitController");
        const conduitController = await ConduitControllerFactory.deploy();
        await conduitController.deployed();
        const SeaportFactory = await ethers.getContractFactory("Seaport");
        const seaportContract = await SeaportFactory.deploy(conduitController.address);
        await seaportContract.deployed();
        const seaport = new Seaport(provider, {
          overrides: {
            contractAddress: seaportContract.address,
          },
        });
        fixture.seaport = seaport;
      }

      if (target.zeroEx) {
        const providerEngine = new Web3ProviderEngine();
        providerEngine.addProvider(new RPCSubprovider("http://localhost:8545/"));
        providerUtils.startProviderEngine(providerEngine);
        const zeroExContract = await fullMigrateAsync(
          owner.address,
          providerEngine,
          { from: owner.address },
          {},
          { wethAddress: wethMock.address }
        );
        const ERC721OrdersFeatureFactory = await ethers.getContractFactory("ERC721OrdersFeature");
        const erc721OrdersFeature = await ERC721OrdersFeatureFactory.deploy(zeroExContract.address, wethMock.address);
        const OwnableFeatureFactory = await ethers.getContractFactory("OwnableFeature");
        const ownableFeature = await OwnableFeatureFactory.attach(zeroExContract.address);
        await ownableFeature.migrate(
          erc721OrdersFeature.address,
          erc721OrdersFeature.interface.getSighash("migrate"),
          owner.address
        );
        const zeroEx = new ZeroEx(provider, owner, TEST_CHAIN_ID, {
          zeroExExchangeProxyContractAddress: zeroExContract.address,
        });
        fixture.zeroEx = zeroEx;
      }

      if (target.zora) {
        // TODO:implement zora
        // TODO:remove "as ZDK"
        fixture.zora = {} as ZDK;
      }

      const ERC20MockFactory = await ethers.getContractFactory("ERC20Mock");
      const erc20Mock = await ERC20MockFactory.deploy();
      await erc20Mock.deployed();
      const ERC721MockFactory = await ethers.getContractFactory("ERC721Mock");
      const erc721Mock = await ERC721MockFactory.deploy();
      await erc721Mock.deployed();
      const ERC1155MockFactory = await ethers.getContractFactory("ERC1155Mock");
      const erc1155Mock = await ERC1155MockFactory.deploy();
      await erc1155Mock.deployed();
      fixture.owner = owner;
      fixture.offerer = offerer;
      fixture.fulfiller = fulfiller;
      fixture.attacker = attacker;
      fixture.wethMock = wethMock;
      fixture.erc20Mock = erc20Mock;
      fixture.erc721Mock = erc721Mock;
      fixture.erc1155Mock = erc1155Mock;
    });
    suiteCb(fixture as Fixture);
  });
};
