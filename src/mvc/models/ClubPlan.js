import { DataTypes } from "sequelize";
import db from "../database/db.js";

const ClubPlan = db.define("ClubPlans", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "silver",
  },
  price: { type: DataTypes.STRING, allowNull: false },
  short_desc: { type: DataTypes.TEXT, allowNull: false },
  long_desc: { type: DataTypes.TEXT, allowNull: false },
});

export default ClubPlan;
