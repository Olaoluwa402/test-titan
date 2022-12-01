import db from "../database/db.js";
// Test DB
db.authenticate()
  .then(() => console.log("Database connected... HOME"))
  .catch((err) => console.log("database error Error HOME: " + err));

import { Setting } from "../models/central.js";
import { Team } from "../models/central.js";
import { Property } from "../models/central.js";
import { Slider } from "../models/central.js";
import { Service } from "../models/central.js";
import { About } from "../models/central.js";
import { Vision } from "../models/central.js";
import { ServiceMenu } from "../models/central.js";
import { PropertyFeature } from "../models/central.js";
import { PropertyAddedAdvantage } from "../models/central.js";
import { Image } from "../models/central.js";
import { User } from "../models/central.js";
import { Facility } from "../models/central.js";
import { MenuItem } from "../models/central.js";
import { ClubPlan } from "../models/central.js";
import { ClubPlanBenefit } from "../models/central.js";
import { Value } from "../models/central.js";
import { ValueMenu } from "../models/central.js";
import { Membership } from "../models/central.js";
import { PropertyPlan } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// @desc Get teams
// @route GET /api/v1/teams
// @access Public
const getHomeData = catchAsyncErrors(async (req, res, next) => {
  // //find all settings
  try {
    // get teams
    const teams = await Team.findAll({});
    const settings = await Setting.findAll({});
    const menuItems = await MenuItem.findAll({});
    //find all properties
    const properties = await Property.findAll({
      include: [
        { model: Facility, as: "facilities" },
        { model: Image, as: "images" },
        { model: PropertyFeature, as: "propertyFeatures" },
        { model: PropertyPlan, as: "propertyPlans" },
        { model: PropertyPlan, as: "propertyPlans" },
        { model: PropertyAddedAdvantage, as: "propertyAdvantages" },
        { model: User, as: "owner" },
      ],
    });
    //find all club plans
    const clubPlans = await ClubPlan.findAll({
      include: [
        {
          model: Membership,
          as: "members",
        },
        { model: ClubPlanBenefit, as: "benefits" },
      ],
    });

    const sliders = await Slider.findAll({});

    //find all services
    const services = await Service.findAll({
      include: [{ model: ServiceMenu, as: "ServiceMenu" }],
    });

    //find about
    const about = await About.findAll({});
    //find vision
    const vision = await Vision.findAll({});
    const values = await Value.findAll({
      include: [{ model: ValueMenu, as: "ValueMenu" }],
    });

    res.json({
      status: "success",
      data: {
        teams,
        settings,
        properties,
        clubPlans,
        sliders,
        vision,
        about,
        services,
        values,
        menuItems,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

export { getHomeData };
