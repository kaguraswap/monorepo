import assets from "../dist/seeds/assets.json";
import orders from "../dist/seeds/orders.json";
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
