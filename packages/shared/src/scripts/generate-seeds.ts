import { faker } from "@faker-js/faker";
import { ethers } from "ethers";
import fs from "fs";
import path from "path";

import { AssetAttributes, OrderAttributes } from "../../dist/entity/init-models";
import networks from "../configs/networks.json";

const main = () => {
  const possibleContractAddress = [];
  for (let i = 0; i < 10; i++) {
    possibleContractAddress.push(faker.finance.ethereumAddress());
  }

  const possibleWalletAddress = [];
  for (let i = 0; i < 4; i++) {
    possibleWalletAddress.push(faker.finance.ethereumAddress());
  }
  possibleWalletAddress.push("0x9af9ee7729efa8f3c0a897b4b8ffc6230e013cd5");

  const assets: AssetAttributes[] = [];
  for (let i = 0; i < 1000; i++) {
    assets.push({
      chainId: faker.helpers.arrayElement(Object.keys(networks)),
      contractAddress: faker.helpers.arrayElement(possibleContractAddress),
      tokenId: faker.datatype.number().toString(),
      holder: faker.helpers.arrayElement(possibleWalletAddress),
      amount: 1,
      metadata: {
        name: faker.lorem.words(),
        description: faker.lorem.paragraphs(),
        image: faker.image.image(),
      },
    });
  }

  const orders: OrderAttributes[] = [];
  for (let i = 0; i < 1000; i++) {
    const asset = faker.helpers.arrayElement(assets);
    const price = ethers.utils.parseEther(String(faker.datatype.number({ min: 0.001, max: 100 }))).toString();
    const hash = ethers.utils.hexlify(ethers.utils.randomBytes(32));
    orders.push({
      id: hash,
      protocol: faker.helpers.arrayElement(["seaport", "zeroEx"]),
      direction: faker.helpers.arrayElement(["sell"]),
      chainId: asset.chainId,
      contractAddress: asset.contractAddress,
      tokenId: asset.tokenId,
      offerer: asset.holder,
      price: price,
      sortablePrice: Number(price),
      signedOrder: {},
      isValid: faker.helpers.arrayElement([true, false]),
    });
  }
  fs.mkdirSync(path.join(__dirname, "../dist/seeds"), { recursive: true });
  fs.writeFileSync(path.join(__dirname, "../dist/seeds/assets.json"), JSON.stringify(assets));
  fs.writeFileSync(path.join(__dirname, "../dist/seeds/orders.json"), JSON.stringify(orders));
};

main();
