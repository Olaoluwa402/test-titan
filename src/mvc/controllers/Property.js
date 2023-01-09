import { Facility, User } from "../models/central.js";
import { Property } from "../models/central.js";
import { PropertyFeature } from "../models/central.js";
import { PropertyPlan } from "../models/central.js";
import { Image } from "../models/central.js";
import { PropertyAddedAdvantage } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { deleteText } from "../../components/FsUtil.js";
// @desc Create a property
// @route POST /api/v1/properties
// @access Private - admin

const createProperty = catchAsyncErrors(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorHandler("No file seleceted"), 404);
  }
  const image = req.file.filename;
  const {
    video_url,
    title,
    sub_title,
    description,
    pricing,
    location,
    no_of_beds,
    short_desc,
    area,
    no_of_baths,
    parking_space,
    extra_info,
  } = req.body;

  //create Image
  const property = await Property.create({
    video_url,
    videoUrlId: "",
    image,
    title,
    sub_title,
    location,
    description,
    pricing,
    short_desc,
    no_of_beds,
    area,
    no_of_baths,
    parking_space,
    extra_info,
    ownerId: req.user.id,
  });

  res.status(200).json({
    status: "success",
    property,
  });
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
      { model: PropertyAddedAdvantage, as: "propertyAdvantages" },
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
  const image = req.file && req.file.filename ? req.file.filename : "";
  const {
    video_url,
    title,
    sub_title,
    description,
    location,
    pricing,
    short_desc,
    no_of_beds,
    area,
    no_of_baths,
    parking_space,
    extra_info,
  } = req.body;

  console.log("video_url", video_url);

  //find faclity
  const property = await Property.findOne({ where: { id: propertyId } });

  if (!property) {
    return next(new ErrorHandler("No record found"), 404);
  }

  //remove old file from server
  if (image && property.image) {
    await deleteText(`public/${property.image}`);
  }

  property.video_url =
    video_url && property.video_url !== video_url
      ? video_url
      : property.video_url;
  property.image = image && property.image !== image ? image : property.image;
  property.no_of_beds =
    no_of_beds && property.no_of_beds !== no_of_beds
      ? no_of_beds
      : property.no_of_beds;
  property.description =
    description && property.description !== description
      ? description
      : property.description;
  property.location =
    location && property.location !== location ? location : property.location;
  property.title = title && property.title !== title ? title : property.title;
  property.sub_title =
    sub_title && property.sub_title !== sub_title
      ? sub_title
      : property.sub_title;
  property.pricing =
    pricing && property.pricing !== pricing ? pricing : property.pricing;
  property.short_desc =
    short_desc && property.short_desc !== short_desc
      ? short_desc
      : property.short_desc;
  property.area = area && property.area !== area ? area : property.area;
  property.no_of_baths =
    no_of_baths && property.no_of_baths !== no_of_baths
      ? no_of_baths
      : property.no_of_baths;
  property.parking_space =
    parking_space && property.parking_space !== parking_space
      ? parking_space
      : property.parking_space;
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
  await deleteText(`public/${property.image}`);
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
