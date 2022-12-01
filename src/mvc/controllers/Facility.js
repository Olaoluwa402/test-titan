import db from "../database/db.js";
import { Facility } from "../models/central.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { readText, deleteText } from "../../components/fsUtil.js";

// @desc Create a facilty
// @route POST /api/v1/facilities
// @access Private - admin

const createFacility = catchAsyncErrors(async (req, res, next) => {
  const icon = req.file.filename;
  const { title, onMaissonete, onTypicalFloor, propertyId } = req.body;

  //create facility
  const facility = await Facility.create({
    icon,
    title,
    onMaissonete,
    onTypicalFloor,
    propertyId,
  });

  res.status(200).json({
    status: "success",
    facility,
  });
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
  const icon = req.file && req.file.filename ? req.file.filename : "";
  const { title, onMaissonete, onTypicalFloor, propertyId } = req.body;
  //find faclity
  const facility = await Facility.findOne({ where: { id: facilityId } });
  if (!facility) {
    return next(new ErrorHandler("No record found"), 404);
  }

  //remove old file from server
  if (icon) {
    await deleteText(`public/${facility.icon}`);
  }

  facility.icon = icon && icon !== facility.icon ? icon : facility.icon;

  facility.title = title && title !== facility.title ? title : facility.title;
  facility.onMaissonete =
    onMaissonete && onMaissonete !== facility.onMaissonete
      ? onMaissonete
      : facility.onMaissonete;
  facility.onTypicalFloor =
    onTypicalFloor && onTypicalFloor !== facility.onTypicalFloor
      ? onTypicalFloor
      : facility.onTypicalFloor;
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

  await deleteText(`public/${facility.icon}`);
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
