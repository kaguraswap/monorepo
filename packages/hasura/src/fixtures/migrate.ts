import assets from "../../dist/fixtures/raw/assets.json";
import orders from "../../dist/fixtures/raw/orders.json";
import { models } from "../lib/sequelize";

const main = () => {
  models.Asset.count().then((count) => {
    if (count === 0) {
      console.log("no record found for asset, so start migrating...");
      models.Asset.bulkCreate(assets);
      console.log("asset migration completed");
    } else {
      console.log("skip asset migration");
    }
  });
  models.Order.count().then((count) => {
    if (count === 0) {
      console.log("no record found for order, so start migrating...");
      models.Order.bulkCreate(orders);
      console.log("order migration completed");
    } else {
      console.log("skip order migration");
    }
  });
};

main();
