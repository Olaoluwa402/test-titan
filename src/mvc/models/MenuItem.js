import { DataTypes } from "sequelize";
import db from "../database/db.js";

const MenuItem = db.define(
  "MenuItems",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
  },
  {}
);

export default MenuItem;
