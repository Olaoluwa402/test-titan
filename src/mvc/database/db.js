import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";
// new sequelize instance
const db = new Sequelize(
  process.env.SEQUELIZE_DATABASE,
  process.env.SEQUELIZE_USERNAME,
  process.env.SEQUELIZE_PASSWORD,
  {
    host: process.env.SEQUELIZE_HOST,
    dialect:
      process.env
        .SEQUELIZE_DIALECT /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
    logging: true,
  }
);

export default db;
