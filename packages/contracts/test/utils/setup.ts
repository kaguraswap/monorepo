import { Seaport } from "@opensea/seaport-js";
import { ethers } from "hardhat";

import type { ERC20Mock, ERC721Mock, ERC1155Mock, Seaport as SeaportContract } from "../../typechain";

type Fixture = {
  seaportContract: SeaportContract;
  seaport: Seaport;
  erc20Mock: ERC20Mock;
  erc721Mock: ERC721Mock;
  erc1155Mock: ERC1155Mock;
};

export const describeWithSeaportFixture = (name: string, suiteCb: (fixture: Fixture) => unknown) => {
  describe(name, () => {
    const fixture: Partial<Fixture> = {};

    beforeEach(async () => {
      const SeaportFactory = await ethers.getContractFactory("Seaport");
      const ConduitControllerFactory = await ethers.getContractFactory("ConduitController");
      const conduitController = await ConduitControllerFactory.deploy();
      await conduitController.deployed();
      const seaportContract = await SeaportFactory.deploy(conduitController.address);
      await seaportContract.deployed();
      const seaport = new Seaport(ethers.provider, {
        overrides: {
          contractAddress: seaportContract.address,
        },
      });

      const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
      const erc20Mock = await ERC20Mock.deploy();
      await erc20Mock.deployed();

      const ERC721Mock = await ethers.getContractFactory("ERC721Mock");
      const erc721Mock = await ERC721Mock.deploy();
      await erc721Mock.deployed();

      const ERC1155Mock = await ethers.getContractFactory("ERC1155Mock");
      const erc1155Mock = await ERC1155Mock.deploy();
      await erc1155Mock.deployed();

      fixture.seaportContract = seaportContract;
      fixture.seaport = seaport;
      fixture.erc20Mock = erc20Mock;
      fixture.erc721Mock = erc721Mock;
      fixture.erc1155Mock = erc1155Mock;
    });

    suiteCb(fixture as Fixture);
  });
};
