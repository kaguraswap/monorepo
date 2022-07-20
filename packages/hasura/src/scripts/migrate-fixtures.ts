import assets from "../../dist/fixtures/assets.json";
import orders from "../../dist/fixtures/orders.json";
import { models } from "../sequelize";

const main = () => {
  models.Asset.count().then((count) => {
    if (count === 0) {
      models.Asset.bulkCreate(assets);
    }
  });
  models.Order.count().then((count) => {
    if (count === 0) {
      models.Order.bulkCreate(orders);
    }
  });
};

main();
