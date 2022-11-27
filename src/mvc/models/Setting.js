import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Setting = db.define(
  "Settings",
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
    company_address: { type: DataTypes.STRING, allowNull: false },
    aboutUsTitle: { type: DataTypes.STRING, allowNull: false },
    aboutUsText: { type: DataTypes.STRING, allowNull: false },
    aboutUsImage: { type: DataTypes.STRING, allowNull: false },
    aboutUsImageId: { type: DataTypes.STRING, allowNull: true },
    ourVisionTitle: { type: DataTypes.STRING, allowNull: false },
    ourVisionText: { type: DataTypes.STRING, allowNull: false },
    ourVisionImage: { type: DataTypes.STRING, allowNull: false },
    ourVisionImageId: { type: DataTypes.STRING, allowNull: true },
    ourServiceTitle: { type: DataTypes.STRING, allowNull: false },
    ourServiceText: { type: DataTypes.STRING, allowNull: false },
    ourServiceImage: { type: DataTypes.STRING, allowNull: false },
    ourServiceImageId: { type: DataTypes.STRING, allowNull: true },
  },
  {}
);

export default Setting;
