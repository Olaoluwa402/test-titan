import { DataTypes } from "sequelize";
import db from "../database/db.js";

import bcrypt from "bcryptjs";

const User = db.define(
  "Users",
  {
    email: {
      validate: { isEmail: true },
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "client", "super-admin"],
      allowNull: false,
      defaultValue: "admin",
    },
    emailIsVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const hasedPW = passwordHashed(value);
        this.setDataValue("password", hasedPW);
      },
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    scopes: {
      withPassword: {
        attributes: {},
      },
    },
  }
);

//hash password beefore saving to db
const passwordHashed = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);
  return hashed;
};

export default User;
