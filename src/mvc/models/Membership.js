import { Sequelize, DataTypes } from "sequelize";
import db from "../database/db.js";

const Membership = db.define(
  "Membership",
  {
    firstname: { type: DataTypes.STRING, allowNull: true },
    lastname: { type: DataTypes.STRING, allowNull: true },
    job_title: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    marital_Status: {
      type: DataTypes.ENUM,
      values: ["single", "married"],
      allowNull: true,
      defaultValue: "single",
    },
    employment_status: {
      type: DataTypes.ENUM,
      values: ["employed", "unemployed", "self-employed", "student"],
      allowNull: true,
      defaultValue: "employed",
    },
    join_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
    heard_about: { type: DataTypes.STRING, allowNull: true },
    refer_friend: { type: DataTypes.STRING, allowNull: true },
  },
  {
    // Other model options go here
  }
);

export default Membership;
