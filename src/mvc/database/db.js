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
    define: {
      freezeTableName: true,
    },
  }
);

// Test DB
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("database error Error: " + err));

export default db;
