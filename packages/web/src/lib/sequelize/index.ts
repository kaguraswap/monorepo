import { Sequelize } from "sequelize";

import { initModels } from "../../../../common/generated/entity/init-models";

export const POSTGRES_CONNECTION_STRING = "postgres://postgres:postgrespassword@localhost:5432/postgres";
export const sequelize = new Sequelize(POSTGRES_CONNECTION_STRING);

export const orm = initModels(sequelize);
