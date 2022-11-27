import { Sequelize, DataTypes, UUIDV4 } from "sequelize";
import db from "../database/db.js";

const Property = db.define(
  "Property",
  {
    video_url: { type: DataTypes.STRING, allowNull: false },
    videoUrlId: { type: DataTypes.STRING, allowNull: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    pricing: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    no_of_beds: { type: DataTypes.STRING, allowNull: false },
    extra_info: { type: DataTypes.STRING, allowNull: false },
  },
  {}
);

export default Property;
