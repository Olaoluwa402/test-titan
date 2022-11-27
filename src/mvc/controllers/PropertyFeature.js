import { PropertyFeature } from "../models/central.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// @desc Create a property feature
// @route POST /api/v1/property_features
// @access Private - admin

const createPropertFeature = catchAsyncErrors(async (req, res, next) => {
  const { icon, title, description, propertyId } = req.body;

  const rgx = /^http/gi;

  if (rgx.test(icon)) {
    //create Image
    const propertyFeature = await PropertyFeature.create({
      icon: icon,
      iconId: "",
      title,
      description,
      propertyId,
    });

    res.status(200).json({
      status: "success",
      propertyFeature,
    });
  } else {
    //upload to cloudinary helper function
    const result = await uploadToCloudinary(icon, "image");

    //create Image
    const propertyFeature = await PropertyFeature.create({
      icon: result.secure_url,
      iconId: result.public_id,
      title,
      description,
      propertyId,
    });

    res.status(200).json({
      status: "success",
      propertyFeature,
    });
  }
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
  const { icon, title, description, propertyId } = req.body;

  //find property feature
  const property_feature = await PropertyFeature.findOne({
    where: {
      id: property_featureId,
    },
  });

  if (!property_feature) {
    return next(new ErrorHandler("No record found"), 404);
  }

  const rgx = /^http/gi;

  let iconResolved;
  let iconIdResolved;

  if (icon && rgx.test(icon)) {
    iconResolved = icon;
  }

  //upload to cloudinary helper function
  if (icon && !rgx.test(icon)) {
    const result = await uploadToCloudinary(
      icon,
      "image",
      property_feature.iconId
    );
    iconResolved = result.secure_url;
    iconIdResolved = result.public_id;
  }

  property_feature.icon =
    iconResolved && iconResolved !== property_feature.icon
      ? iconResolved
      : property_feature.icon;
  property_feature.iconId =
    iconIdResolved && iconIdResolved !== property_feature.iconId
      ? iconIdResolved
      : property_feature.iconId;
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
  const property_feature = await PropertyFeature.findOne({
    id: property_featureId,
  });
  if (!property_feature) {
    return next(new ErrorHandler("No record found"), 404);
  }

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
