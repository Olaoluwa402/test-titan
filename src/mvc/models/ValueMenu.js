import { DataTypes } from "sequelize";
import db from "../database/db.js";

const ValueMenu = db.define(
  "valuemenus",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    desc: { type: DataTypes.TEXT, allowNull: false },
    icon: { type: DataTypes.STRING, allowNull: true },
    iconId: { type: DataTypes.STRING, allowNull: true },
  },
  {}
);

export default ValueMenu;
