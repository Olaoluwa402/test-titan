import { PropertyAddedAdvantage } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { deleteText } from "../../components/FsUtil.js";

// @desc Create a property added advantages
// @route POST /api/v1/property_advantages
// @access Private - admin

const createPropertyAddedAdvantage = catchAsyncErrors(
  async (req, res, next) => {
    const icon = req.file.filename;
    const { title, description, propertyId } = req.body;

    //create Image
    const propertyAddedAdvantage = await PropertyAddedAdvantage.create({
      icon,
      title,
      description,
      propertyId,
    });

    res.status(200).json({
      status: "success",
      propertyAddedAdvantage,
    });
  }
);

// @desc get property feature
// @route GET/api/v1/property_advantages
// @access Private - admin

const getAllPropertyAddedAdvantage = catchAsyncErrors(
  async (req, res, next) => {
    //find all property feature
    const propertyAdvantages = await PropertyAddedAdvantage.findAll({});

    res.json({
      status: "success",
      propertyAdvantages,
    });
  }
);

// @desc get property feature
// @route GET /api/v1/property_features/:id
// @access Private - admin
const getPropertyAddedAdvantage = catchAsyncErrors(async (req, res, next) => {
  const propertyId = req.query.id;

  //find property feature
  const propertyAdvantage = await PropertyAddedAdvantage.findOne({
    where: {
      id: propertyId,
    },
  });
  if (!propertyAdvantage) {
    return next(new ErrorHandler("No record found"), 404);
  }

  res.status(200).json({
    status: "success",
    propertyAdvantage,
  });
});

// @desc update property feature
// @route PUT /api/v1/property_features/:id
// @access Private - admin

const updatePropertyAddedAvantage = catchAsyncErrors(async (req, res, next) => {
  const property_featureId = req.query.id;
  const icon = req.file && req.file.filename ? req.file.filename : "";
  const { title, description, propertyId } = req.body;

  //find property feature
  const property = await PropertyAddedAdvantage.findOne({
    where: {
      id: property_featureId,
    },
  });

  if (!property) {
    return next(new ErrorHandler("No record found"), 404);
  }

  //remove old file from server
  if (icon) {
    await deleteText(`public/${property.icon}`);
  }

  property.icon = icon && icon !== property.icon ? icon : property.icon;

  property.description =
    description && description !== property.description
      ? description
      : property.description;
  property.title = title && title !== property.title ? title : property.title;
  property.propertyId =
    propertyId && propertyId !== property.propertyId
      ? propertyId
      : property.propertyId;

  //save the updated record
  const updatedPropertyAdantage = await property.save();

  res.status(200).json({
    status: "success",
    updatedPropertyAdantage,
  });
});
// @desc delete property feature
// @route DELETE /api/v1/property_features/:id
// @access Private - admin

const deletePropertyAddedAdanvatge = catchAsyncErrors(
  async (req, res, next) => {
    const property_featureId = req.query.id;

    //find the facility
    const property = await PropertyAddedAdvantage.findOne({
      id: property_featureId,
    });
    if (!property) {
      return next(new ErrorHandler("No record found"), 404);
    }
    await deleteText(`public/${property.icon}`);
    //remove found itemm
    await property.destroy();

    res.status(200).json({
      status: "success",
      message: "removed successfully",
    });
  }
);

export {
  createPropertyAddedAdvantage,
  getAllPropertyAddedAdvantage,
  getPropertyAddedAdvantage,
  deletePropertyAddedAdanvatge,
  updatePropertyAddedAvantage,
};
