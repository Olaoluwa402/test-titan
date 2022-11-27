import { Sequelize, DataTypes, UUIDV4 } from "sequelize";
import db from "../database/db.js";

const Quotation = db.define(
  "quotations",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    detail: { type: DataTypes.TEXT, allowNull: false },
  },
  {}
);

export default Quotation;
