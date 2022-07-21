import { Sequelize } from "sequelize";

import { LOCAL_POSTGRES_CONNECTN } from "../../../../shared/src/configs/app";
import { initModels } from "../../../dist/entity/init-models";

const option = process.env.SSL
  ? {
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }
  : {};

export const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION || LOCAL_POSTGRES_CONNECTN, option);

export const models = initModels(sequelize);
