import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Value = db.define(
  "Valuezes",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    desc: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
    imageId: { type: DataTypes.STRING, allowNull: true },
  },
  {}
);

export default Value;
