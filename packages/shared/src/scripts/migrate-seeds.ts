import assets from "../dist/seeds/assets.json";
import orders from "../dist/seeds/orders.json";
import { models } from "../sequelize";

const main = () => {
  models.Asset.bulkCreate(assets);
  models.Order.bulkCreate(orders);
};

main();
