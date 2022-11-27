import db from "../database/db.js";
import { Facility } from "../models/central.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// @desc Create a facilty
// @route POST /api/v1/facilities
// @access Private - admin

const createFacility = catchAsyncErrors(async (req, res, next) => {
  const { icon, title, propertyId } = req.body;

  const rgx = /^http/gi;

  if (rgx.test(icon)) {
    //create Image
    const facility = await Facility.create({
      icon: icon,
      iconId: "",
      title,
      propertyId,
    });

    res.status(200).json({
      status: "success",
      facility,
    });
  } else {
    //upload to cloudinary helper function
    const result = await uploadToCloudinary(icon, "image");

    //create facility
    const facility = await Facility.create({
      icon: result.secure_url,
      iconId: result.public_id,
      title,
      propertyId,
    });

    res.status(200).json({
      status: "success",
      facility,
    });
  }
});

// @desc Get facilities
// @route GET /api/v1/facilities
// @access Private - admin
const getFacilities = catchAsyncErrors(async (req, res, next) => {
  //find all club plans
  const facilities = await Facility.findAll({});

  res.json({
    status: "success",
    facilities,
  });
});

// @desc Get facility
// @route GET /api/v1/facilities/:id
// @access Private - admin
const getFacility = catchAsyncErrors(async (req, res, next) => {
  const facilityId = req.query.id;
  //find club plan
  const facility = await Facility.findOne({ where: { id: facilityId } });
  if (!facility) {
    return next(new ErrorHandler("No record found"), 404);
  }
  res.status(200).json({
    status: "success",
    facility,
  });
});

// @desc Update facility
// @route PUT /api/v1/faclities/:id
// @access Private - admin only

const updateFacility = catchAsyncErrors(async (req, res, next) => {
  const facilityId = req.query.id;
  const { icon, title, propertyId } = req.body;
  //find faclity
  const facility = await Facility.findOne({ where: { id: facilityId } });
  if (!facility) {
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
    const result = await uploadToCloudinary(icon, "image", facility.iconId);
    iconResolved = result.secure_url;
    iconIdResolved = result.public_id;
  }

  facility.icon =
    iconResolved && iconResolved !== facility.icon
      ? iconResolved
      : facility.icon;
  facility.iconId =
    iconIdResolved && iconIdResolved !== facility.iconId
      ? iconIdResolved
      : facility.iconId;
  facility.title = title && title !== facility.title ? title : facility.title;

  facility.propertyId =
    propertyId && propertyId !== facility.propertyId
      ? propertyId
      : facility.propertyId;
  //save the updated record
  const updatedFacility = await facility.save();
  res.status(200).json({
    status: "success",
    updatedFacility,
  });
});

// @desc delete facility
// @route GET /api/v1/facilities/:id
// @access Private - admin
const deleteFacility = catchAsyncErrors(async (req, res, next) => {
  const faciltyId = req.query.id;
  //find the facility
  const facility = await Facility.findOne({ where: { id: faciltyId } });
  if (!facility) {
    return next(new ErrorHandler("No record found"), 404);
  }
  //remove found itemm
  await facility.destroy();
  res.status(200).json({
    status: "success",
    message: "Facility removed successfully",
  });
});

export {
  createFacility,
  getFacility,
  getFacilities,
  deleteFacility,
  updateFacility,
};
