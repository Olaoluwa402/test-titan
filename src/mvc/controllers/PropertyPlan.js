import { Property } from "../models/central.js";
import { PropertyPlan } from "../models/central.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// @desc Create a plan
// @route POST /api/v1/property_plans
// @access Private - admin

const createPlan = catchAsyncErrors(async (req, res, next) => {
  const { price, image, title, propertyId } = req.body;
  const rgx = /^http/gi;
  if (rgx.test(image)) {
    //create Image
    const propertyPlan = await PropertyPlan.create({
      image: image,
      imageId: "",
      title,
      price,
      propertyId,
    });

    res.status(200).json({
      status: "success",
      propertyPlan,
    });
  } else {
    //upload to cloudinary helper function
    const result = await uploadToCloudinary(image, "image");

    //create plan
    const propertyPlan = await PropertyPlan.create({
      image: result.secure_url,
      imageId: result.public_id,
      title,
      price,
      propertyId,
    });

    res.status(200).json({
      status: "success",
      propertyPlan,
    });
  }
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
  const { price, image, title, propertyId } = req.body;

  //find faclity
  const plan = await PropertyPlan.findOne({ where: { id: planId } });

  if (!plan) {
    return next(new ErrorHandler("No record found"), 404);
  }

  const rgx = /^http/gi;

  let imageResolved;
  let imageIdResolved;

  if (image && rgx.test(image)) {
    imageResolved = image;
  }

  //upload to cloudinary helper function
  if (image && !rgx.test(image)) {
    const result = await uploadToCloudinary(image, "image", plan.imageId);
    imageResolved = result.secure_url;
    imageIdResolved = result.public_id;
  }

  plan.image =
    imageResolved && imageResolved !== plan.image ? imageResolved : plan.image;
  plan.imageId =
    imageIdResolved && imageIdResolved !== plan.imageId
      ? imageIdResolved
      : plan.imageId;
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

  //remove found itemm
  await plan.destroy();

  res.status(200).json({
    status: "success",
    message: "Plan removed successfully",
  });
});

export { createPlan, getPlan, getPlans, deletePlan, updatePlan };
