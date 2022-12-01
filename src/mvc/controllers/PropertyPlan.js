import { Property } from "../models/central.js";
import { PropertyPlan } from "../models/central.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { readText, deleteText } from "../../components/fsUtil.js";

// @desc Create a plan
// @route POST /api/v1/property_plans
// @access Private - admin

const createPlan = catchAsyncErrors(async (req, res, next) => {
  const image = req.file.filename;
  const { price, title, propertyId } = req.body;

  //create plan
  const propertyPlan = await PropertyPlan.create({
    image,
    title,
    price,
    propertyId,
  });

  res.status(200).json({
    status: "success",
    propertyPlan,
  });
});

// @desc Get plans
// @route GET /api/v1/plans
// @access Private - admin
const getPlans = catchAsyncErrors(async (req, res, next) => {
  //find all club plans
  const plans = await PropertyPlan.findAll({ model: Property });

  res.json({
    status: "success",
    plans,
  });
});

// @desc Get a plan
// @route GET /api/v1/plans/:id
// @access Private - admin
const getPlan = catchAsyncErrors(async (req, res, next) => {
  const planId = req.query.id;

  //find club plan
  const plan = await PropertyPlan.findOne({ where: { id: planId } });
  if (!plan) {
    return next(new ErrorHandler("No record found"), 404);
  }

  res.status(200).json({
    status: "success",
    plan,
  });
});

// @desc Update plan
// @route PUT /api/v1/plans/:id
// @access Private - admin only

const updatePlan = catchAsyncErrors(async (req, res, next) => {
  const planId = req.query.id;
  const image = req.file && req.file.filename ? req.file.filename : "";
  const { price, title, propertyId } = req.body;

  //find faclity
  const plan = await PropertyPlan.findOne({ where: { id: planId } });

  if (!plan) {
    return next(new ErrorHandler("No record found"), 404);
  }

  //remove old file from server
  if (image) {
    console.log("deleted");
    await deleteText(`public/${plan.image}`);
  }

  plan.image = image && image !== plan.image ? image : plan.image;

  plan.price = price && price !== plan.price ? price : plan.price;

  plan.title = title && title !== plan.title ? title : plan.title;
  plan.propertyId =
    propertyId && propertyId !== plan.propertyId ? propertyId : plan.propertyId;

  //save the updated record
  const updatedPlan = await plan.save();

  res.status(200).json({
    status: "success",
    updatedPlan,
  });
});

// @desc delete plan
// @route GET /api/v1/plans/:id
// @access Private - admin
const deletePlan = catchAsyncErrors(async (req, res, next) => {
  const planId = req.query.id;

  //find the facility
  const plan = await PropertyPlan.findOne({ where: { id: planId } });
  if (!plan) {
    return next(new ErrorHandler("No record found"), 404);
  }

  await deleteText(`public/${plan.image}`);
  //remove found itemm
  await plan.destroy();

  res.status(200).json({
    status: "success",
    message: "Plan removed successfully",
  });
});

export { createPlan, getPlan, getPlans, deletePlan, updatePlan };
