import { DataTypes } from "sequelize";
import db from "../database/db.js";

const PropertyAddedAdvantage = db.define(
  "propertyaddedadvantage",
  {
    icon: { type: DataTypes.STRING, allowNull: false },
    iconId: { type: DataTypes.STRING, allowNull: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
  },
  {}
);

export default PropertyAddedAdvantage;
