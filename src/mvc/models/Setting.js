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
    aboutUsTitle: { type: DataTypes.TEXT, allowNull: false },
    aboutUsText: { type: DataTypes.TEXT, allowNull: false },
    aboutUsImage: { type: DataTypes.STRING, allowNull: false },
    aboutUsImageId: { type: DataTypes.STRING, allowNull: true },
    ourVisionTitle: { type: DataTypes.TEXT, allowNull: false },
    ourVisionText: { type: DataTypes.TEXT, allowNull: false },
    ourVisionImage: { type: DataTypes.STRING, allowNull: false },
    ourVisionImageId: { type: DataTypes.STRING, allowNull: true },
    ourServiceTitle: { type: DataTypes.TEXT, allowNull: false },
    ourServiceText: { type: DataTypes.TEXT, allowNull: false },
    ourServiceImage: { type: DataTypes.STRING, allowNull: false },
    ourServiceImageId: { type: DataTypes.STRING, allowNull: true },
  },
  {}
);

export default Setting;
