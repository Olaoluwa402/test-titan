import { Sequelize, DataTypes, UUIDV4 } from "sequelize";
import db from "../database/db.js";

const Quotation = db.define(
  "Quotation",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    detail: { type: DataTypes.STRING, allowNull: false },
  },
  {}
);

export default Quotation;
