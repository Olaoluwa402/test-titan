import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Slider = db.define(
  "sliders",
  {
    image: { type: DataTypes.STRING, allowNull: false },
    imageId: { type: DataTypes.STRING, allowNull: true },
    url: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
  },
  {}
);

export default Slider;
