import { DataTypes } from "sequelize";
import db from "../database/db.js";

const About = db.define(
  "abouts",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    desc: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
    imageId: { type: DataTypes.STRING, allowNull: true },
  },
  {}
);

export default About;
