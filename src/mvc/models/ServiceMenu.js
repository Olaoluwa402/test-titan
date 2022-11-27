import { DataTypes } from "sequelize";
import db from "../database/db.js";

const ServiceMenu = db.define(
  "ServiceMenu",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    desc: { type: DataTypes.STRING, allowNull: false },
    icon: { type: DataTypes.STRING, allowNull: true },
    iconId: { type: DataTypes.STRING, allowNull: true },
  },
  {}
);

export default ServiceMenu;
