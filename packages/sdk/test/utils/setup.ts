import { fullMigrateAsync } from "@0x/contracts-zero-ex";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Seaport } from "@opensea/seaport-js";
import { NftSwapV4 as ZeroEx } from "@traderxyz/nft-swap-sdk";
import { ethers, network, web3 } from "hardhat";

import { ERC20Mock, ERC721Mock, ERC1155Mock } from "../../typechain";

interface Fixture {
  owner: SignerWithAddress;
  offerer: SignerWithAddress;
  fulfiller: SignerWithAddress;
  attacker: SignerWithAddress;
  erc20Mock: ERC20Mock;
  erc721Mock: ERC721Mock;
  erc1155Mock: ERC1155Mock;
  seaport: Seaport;
  zeroEx: {
    offerer: ZeroEx;
    fulfiller: ZeroEx;
  };
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

      const ERC20MockFactory = await ethers.getContractFactory("ERC20Mock");
      const erc20Mock = await ERC20MockFactory.deploy();
      await erc20Mock.deployed();
      const ERC721MockFactory = await ethers.getContractFactory("ERC721Mock");
      const erc721Mock = await ERC721MockFactory.deploy();
      await erc721Mock.deployed();
      const ERC1155MockFactory = await ethers.getContractFactory("ERC1155Mock");
      const erc1155Mock = await ERC1155MockFactory.deploy();
      await erc1155Mock.deployed();

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
        const _consoleLog = console.log;
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        console.log = () => {};
        const _provider = web3.currentProvider as any;
        const zeroExContract = await fullMigrateAsync(
          owner.address,
          {
            sendAsync: (a, b) => _provider.send(a, b),
          },
          { from: owner.address },
          {},
          { wethAddress: erc20Mock.address }
        );
        console.log = _consoleLog;
        const ERC721OrdersFeatureFactory = await ethers.getContractFactory("ERC721OrdersFeature");
        const erc721OrdersFeature = await ERC721OrdersFeatureFactory.deploy(zeroExContract.address, erc20Mock.address);
        const OwnableFeatureFactory = await ethers.getContractFactory("OwnableFeature");
        const ownableFeature = await OwnableFeatureFactory.attach(zeroExContract.address);
        await ownableFeature.migrate(
          erc721OrdersFeature.address,
          erc721OrdersFeature.interface.getSighash("migrate"),
          owner.address
        );
        const zeroEx = {
          offerer: new ZeroEx(provider, offerer, network.config.chainId, {
            zeroExExchangeProxyContractAddress: zeroExContract.address,
          }),
          fulfiller: new ZeroEx(provider, fulfiller, network.config.chainId, {
            zeroExExchangeProxyContractAddress: zeroExContract.address,
          }),
        };
        fixture.zeroEx = zeroEx;
      }

      fixture.owner = owner;
      fixture.offerer = offerer;
      fixture.fulfiller = fulfiller;
      fixture.attacker = attacker;
      fixture.erc20Mock = erc20Mock;
      fixture.erc721Mock = erc721Mock;
      fixture.erc1155Mock = erc1155Mock;
    });
    suiteCb(fixture as Fixture);
  });
};
