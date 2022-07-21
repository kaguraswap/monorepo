import "cross-fetch/polyfill";

import fs from "fs";
import path from "path";

import { AssetDocument, Assets, AssetsDocument } from "../../dist/graphql";
import { apolloClient } from "../lib/apollo";
import { toHasuraCondition } from "../lib/hasura";

const main = async () => {
  const {
    data: { assets },
  } = await apolloClient.query({
    query: AssetsDocument,
  });

  const { chainId, contractAddress, tokenId } = assets.find((asset: Assets) => {
    return asset.validOrders.length > 0;
  });

  const { where } = toHasuraCondition({ chainId, contractAddress, tokenId });
  const {
    data: {
      assets: [asset],
    },
  } = await apolloClient.query({
    query: AssetDocument,
    variables: {
      where,
    },
  });
  fs.mkdirSync(path.join(__dirname, "../../dist/fixtures/graphql"), { recursive: true });
  fs.writeFileSync(path.join(__dirname, "../../dist/fixtures/graphql/assets.json"), JSON.stringify(assets));
  fs.writeFileSync(path.join(__dirname, "../../dist/fixtures/graphql/asset.json"), JSON.stringify(asset));
};

main();
