import { DataTypes } from "sequelize";
import db from "../database/db.js";

const PropertyFeature = db.define(
  "propertyfeatures",
  {
    icon: { type: DataTypes.STRING, allowNull: false },
    iconId: { type: DataTypes.STRING, allowNull: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
  },
  {}
);

export default PropertyFeature;
