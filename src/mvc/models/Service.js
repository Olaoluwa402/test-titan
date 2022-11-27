import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Service = db.define(
  "Service",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    desc: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
    imageId: { type: DataTypes.STRING, allowNull: true },
  },
  {}
);

export default Service;
