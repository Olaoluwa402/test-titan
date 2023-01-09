import { PropertyFeature } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { deleteText } from "../../components/FsUtil.js";
import { Property } from "../models/central.js";

// @desc Create a property feature
// @route POST /api/v1/property_features
// @access Private - admin

const createPropertFeature = catchAsyncErrors(async (req, res, next) => {
  const icon = req.file.filename;
  const { title, description, propertyId } = req.body;

  //create Image
  const propertyFeature = await PropertyFeature.create({
    icon,
    title,
    description,
    propertyId,
  });

  res.status(200).json({
    status: "success",
    propertyFeature,
  });
});

// @desc get property feature
// @route GET /api/v1/property_features
// @access Private - admin

const getPropertyFeatures = catchAsyncErrors(async (req, res, next) => {
  //find all property feature
  const propertyFeatures = await PropertyFeature.findAll({ model: Property });

  res.json({
    status: "success",
    propertyFeatures,
  });
});

// @desc get property feature
// @route GET /api/v1/property_features/:id
// @access Private - admin
const getPropertyFeature = catchAsyncErrors(async (req, res, next) => {
  const property_featureId = req.query.id;

  //find property feature
  const property_feature = await PropertyFeature.findOne({
    where: {
      id: property_featureId,
    },
  });
  if (!property_feature) {
    return next(new ErrorHandler("No record found"), 404);
  }

  res.status(200).json({
    status: "success",
    property_feature,
  });
});

// @desc update property feature
// @route PUT /api/v1/property_features/:id
// @access Private - admin

const updatePropertyFeature = catchAsyncErrors(async (req, res, next) => {
  const property_featureId = req.query.id;
  const icon = req.file && req.file.filename ? req.file.filename : "";
  const { title, description, propertyId } = req.body;

  //find property feature
  const property_feature = await PropertyFeature.findOne({
    where: {
      id: property_featureId,
    },
  });

  if (!property_feature) {
    return next(new ErrorHandler("No record found"), 404);
  }

  //remove old file from server
  if (icon) {
    await deleteText(`public/${property_feature.icon}`);
  }

  property_feature.icon =
    icon && icon !== property_feature.icon ? icon : property_feature.icon;

  property_feature.description =
    description && description !== property_feature.description
      ? description
      : property_feature.description;
  property_feature.title =
    title && title !== property_feature.title ? title : property_feature.title;
  property_feature.propertyId =
    propertyId && propertyId !== property_feature.propertyId
      ? propertyId
      : property_feature.propertyId;

  //save the updated record
  const updatedPropertyFeature = await property_feature.save();

  res.status(200).json({
    status: "success",
    updatedPropertyFeature,
  });
});
// @desc delete property feature
// @route DELETE /api/v1/property_features/:id
// @access Private - admin

const deletePropertyFeature = catchAsyncErrors(async (req, res, next) => {
  const property_featureId = req.query.id;

  //find the facility
  const property_feature = await PropertyFeature.findByPk(property_featureId);
  console.log(property_feature, "pfor");
  if (!property_feature) {
    return next(new ErrorHandler("No record found"), 404);
  }
  await deleteText(`public/${property_feature.icon}`);
  //remove found itemm
  await property_feature.destroy();

  res.status(200).json({
    status: "success",
    message: "Facility removed successfully",
  });
});

export {
  createPropertFeature,
  getPropertyFeature,
  getPropertyFeatures,
  deletePropertyFeature,
  updatePropertyFeature,
};
