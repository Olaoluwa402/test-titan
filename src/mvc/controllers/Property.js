import { Facility, User } from "../models/central.js";
import { Property } from "../models/central.js";
import { PropertyFeature } from "../models/central.js";
import { PropertyPlan } from "../models/central.js";
import { Image } from "../models/central.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
// @desc Create a property
// @route POST /api/v1/properties
// @access Private - admin

const createProperty = catchAsyncErrors(async (req, res, next) => {
  const {
    video_url,
    title,
    description,
    pricing,
    location,
    no_of_beds,
    extra_info,
  } = req.body;

  const rgx = /^http/gi;

  if (rgx.test(video_url)) {
    //create Image
    const property = await Property.create({
      video_url,
      videoUrlId: "",
      title,
      description,
      pricing,
      location,
      no_of_beds,
      extra_info,
      ownerId: req.user.id,
    });

    res.status(200).json({
      status: "success",
      property,
    });
  } else {
    //upload to cloudinary helper function
    const result = await uploadToCloudinary(video_url, "video");

    //create property
    const property = await Property.create({
      video_url: result.secure_url,
      videoUrlId: result.public_id,
      title,
      description,
      pricing,
      extra_info,
      location,
      no_of_beds,
    });

    res.status(200).json({
      status: "success",
      property,
    });
  }
});

// @desc Get properties
// @route GET /api/v1/properties
// @access Private - admin
const getProperties = catchAsyncErrors(async (req, res, next) => {
  //find all properties
  const properties = await Property.findAll({
    include: [
      { model: Facility, as: "facilities" },
      { model: Image, as: "images" },
      { model: PropertyFeature, as: "propertyFeatures" },
      { model: PropertyPlan, as: "propertyPlans" },
      { model: User, as: "owner" },
    ],
  });

  res.json({
    status: "success",
    properties,
  });
});

// @desc Get property
// @route GET /api/v1/properties/:id
// @access Private - admin
const getProperty = catchAsyncErrors(async (req, res, next) => {
  const propertyId = req.query.id;

  //find property
  const property = await Property.findOne({
    where: { id: propertyId },
    include: [
      { model: Facility, as: "facilities" },
      { model: Image, as: "images" },
      { model: PropertyFeature, as: "propertyFeatures" },
      { model: PropertyPlan, as: "propertyPlans" },
      { model: User, as: "owner" },
    ],
  });

  if (!property) {
    return next(new ErrorHandler("No record found"), 404);
  }

  res.status(200).json({
    status: "success",
    property,
  });
});

// @desc Update property
// @route PUT /api/v1/properties/:id
// @access Private - admin only

const updateProperty = catchAsyncErrors(async (req, res, next) => {
  const propertyId = req.query.id;
  const {
    video_url,
    title,
    description,
    pricing,
    location,
    no_of_beds,
    extra_info,
  } = req.body;

  //find faclity
  const property = await Property.findOne({ where: { id: propertyId } });

  if (!property) {
    return next(new ErrorHandler("No record found"), 404);
  }

  property.no_of_beds =
    no_of_beds && property.no_of_beds !== no_of_beds
      ? no_of_beds
      : property.no_of_beds;
  property.description =
    description && property.description !== description
      ? description
      : property.description;
  property.title = title && property.title !== title ? title : property.title;
  property.pricing =
    pricing && property.pricing !== pricing ? pricing : property.pricing;
  property.location =
    location && property.location !== location ? location : property.location;
  property.extra_info =
    extra_info && property.extra_info !== extra_info
      ? extra_info
      : property.extra_info;

  //save the updated record
  const updatedProperty = await property.save();

  res.status(200).json({
    status: "success",
    updatedProperty,
  });
});

// @desc delete property
// @route GET /api/v1/properties/:id
// @access Private - admin
const deleteProperty = catchAsyncErrors(async (req, res, next) => {
  const propertyId = req.query.id;

  //find the property
  const property = await Property.findOne({ where: { id: propertyId } });
  if (!property) {
    return next(new ErrorHandler("No record found"), 404);
  }

  //remove found itemm
  await property.destroy();

  res.status(200).json({
    status: "success",
    message: "Property removed successfully",
  });
});

export {
  createProperty,
  getProperty,
  getProperties,
  deleteProperty,
  updateProperty,
};
