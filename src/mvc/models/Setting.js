import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Setting = db.define(
  "settings",
  {
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    getQuoteCTA: { type: DataTypes.STRING, allowNull: false },
    selectLocationPlaceholder: { type: DataTypes.STRING, allowNull: false },
    selectBedroomAmountPlaceholder: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    selectPropertyPlaceholder: { type: DataTypes.STRING, allowNull: false },
    selectPriceRangePlaceholder: { type: DataTypes.STRING, allowNull: false },
    company_address: { type: DataTypes.TEXT, allowNull: false },
  },
  {}
);

export default Setting;
