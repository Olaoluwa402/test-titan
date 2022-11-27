import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Team = db.define(
  "Teams",
  {
    image: { type: DataTypes.STRING, allowNull: false },
    imageId: { type: DataTypes.STRING, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false },
    designation: { type: DataTypes.STRING, allowNull: false },
  },
  {}
);

export default Team;
