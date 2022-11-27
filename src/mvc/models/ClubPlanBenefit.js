import { DataTypes } from "sequelize";
import db from "../database/db.js";

const ClubPlanBenefit = db.define("clubplanbenefits", {
  benefit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clubPlanId: { type: DataTypes.STRING, allowNull: false },
});

export default ClubPlanBenefit;
