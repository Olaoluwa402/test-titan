import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Facility = db.define(
  "facilities",
  {
    icon: { type: DataTypes.STRING, allowNull: false },
    iconId: { type: DataTypes.STRING, allowNull: true },
    title: { type: DataTypes.STRING, allowNull: false },
  },
  {}
);

export default Facility;
