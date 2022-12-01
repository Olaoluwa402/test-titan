import { DataTypes } from "sequelize";
import db from "../database/db.js";

const PropertyPlan = db.define(
  "propertyplans",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    imageId: { type: DataTypes.STRING, allowNull: true },
    price: { type: DataTypes.STRING, allowNull: true },
  },
  {}
);

export default PropertyPlan;
