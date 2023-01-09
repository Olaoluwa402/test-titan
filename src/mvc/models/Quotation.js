import { Sequelize, DataTypes, UUIDV4 } from "sequelize";
import db from "../database/db.js";

const Quotation = db.define(
  "quotations",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE },
  },
  {}
);

export default Quotation;
