import { Sequelize } from "sequelize";

import { initModels } from "../../../dist/entity/init-models";

export const sequelize = new Sequelize(
  process.env.POSTGRES_CONNECTION || "postgres://postgres:postgrespassword@localhost:5432/postgres",
  {
    dialectOptions: process.env.PGSSLMODE
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : {},
  }
);

export const models = initModels(sequelize);
