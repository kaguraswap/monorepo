import { fullMigrateAsync } from "@0x/contracts-zero-ex";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Seaport } from "@opensea/seaport-js";
import { NftSwapV4 as ZeroEx } from "@traderxyz/nft-swap-sdk";
import { ethers, network, web3 } from "hardhat";

import { KaguraSDK } from "../../lib";
import { Overrides } from "../../lib/order";
import { ERC20Mock, ERC721Mock, ERC1155Mock } from "../../typechain";

interface Fixture {
  owner: SignerWithAddress;
  offerer: SignerWithAddress;
  fulfiller: SignerWithAddress;
  erc20Mock: ERC20Mock;
  erc721Mock: ERC721Mock;
  erc1155Mock: ERC1155Mock;
  seaport: Seaport;
  zeroEx: {
    offerer: ZeroEx;
    fulfiller: ZeroEx;
  };
  sdk: KaguraSDK;
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
      const provider = ethers.provider;

      [fixture.owner, fixture.offerer, fixture.fulfiller] = await ethers.getSigners();

      const ERC20MockFactory = await ethers.getContractFactory("ERC20Mock");
      fixture.erc20Mock = await ERC20MockFactory.deploy();
      await fixture.erc20Mock.deployed();
      const ERC721MockFactory = await ethers.getContractFactory("ERC721Mock");
      fixture.erc721Mock = await ERC721MockFactory.deploy();
      await fixture.erc721Mock.deployed();
      const ERC1155MockFactory = await ethers.getContractFactory("ERC1155Mock");
      fixture.erc1155Mock = await ERC1155MockFactory.deploy();
      await fixture.erc1155Mock.deployed();

      const overrides: Overrides = {};
      if (target.seaport) {
        const ConduitControllerFactory = await ethers.getContractFactory("ConduitController");
        const conduitController = await ConduitControllerFactory.deploy();
        await conduitController.deployed();
        const SeaportFactory = await ethers.getContractFactory("Seaport");
        const seaportContract = await SeaportFactory.deploy(conduitController.address);
        await seaportContract.deployed();
        fixture.seaport = new Seaport(provider, {
          overrides: {
            contractAddress: seaportContract.address,
          },
        });
        overrides.seaport = seaportContract.address;
      }

      if (target.zeroEx) {
        const _consoleLog = console.log;
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        console.log = () => {};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _provider = web3.currentProvider as any;
        const zeroExContract = await fullMigrateAsync(
          fixture.owner.address,
          {
            sendAsync: (a, b) => _provider?.send(a, b),
          },
          { from: fixture.owner.address },
          {},
          { wethAddress: fixture.erc20Mock.address }
        );
        console.log = _consoleLog;
        const ERC721OrdersFeatureFactory = await ethers.getContractFactory("ERC721OrdersFeature");
        const erc721OrdersFeature = await ERC721OrdersFeatureFactory.deploy(
          zeroExContract.address,
          fixture.erc20Mock.address
        );
        const OwnableFeatureFactory = await ethers.getContractFactory("OwnableFeature");
        const ownableFeature = await OwnableFeatureFactory.attach(zeroExContract.address);
        await ownableFeature.migrate(
          erc721OrdersFeature.address,
          erc721OrdersFeature.interface.getSighash("migrate"),
          fixture.owner.address
        );
        fixture.zeroEx = {
          offerer: new ZeroEx(provider, fixture.offerer, network.config.chainId, {
            zeroExExchangeProxyContractAddress: zeroExContract.address,
          }),
          fulfiller: new ZeroEx(provider, fixture.fulfiller, network.config.chainId, {
            zeroExExchangeProxyContractAddress: zeroExContract.address,
          }),
        };
        overrides.zeroEx = zeroExContract.address;
      }
      fixture.sdk = new KaguraSDK(provider, overrides);
    });
    suiteCb(fixture as Fixture);
  });
};
