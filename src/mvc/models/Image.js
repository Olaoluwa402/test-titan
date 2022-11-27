import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Image = db.define(
  "Image",
  {
    url: { type: DataTypes.STRING, allowNull: false },
    imageId: { type: DataTypes.STRING, allowNull: true },
  },
  {}
);

export default Image;
