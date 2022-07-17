import { Sequelize } from "sequelize";

import { initModels } from "../../../../common/dist/entity/init-models";

export const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION || "");

export const orm = initModels(sequelize);
