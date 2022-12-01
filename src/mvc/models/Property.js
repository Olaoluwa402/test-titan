import { Sequelize, DataTypes, UUIDV4 } from "sequelize";
import db from "../database/db.js";

const Property = db.define(
  "properties",
  {
    video_url: { type: DataTypes.STRING, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: false },
    videoUrlId: { type: DataTypes.STRING, allowNull: true },
    title: { type: DataTypes.STRING, allowNull: false },
    sub_title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    pricing: { type: DataTypes.STRING, allowNull: false },
    short_desc: { type: DataTypes.TEXT, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    no_of_beds: { type: DataTypes.INTEGER, allowNull: false },
    area: { type: DataTypes.INTEGER, allowNull: false },
    parking_space: { type: DataTypes.INTEGER, allowNull: false },
    no_of_baths: { type: DataTypes.INTEGER, allowNull: false },
    // extra_info: { type: DataTypes.STRING, allowNull: false },
  },
  {}
);

export default Property;
