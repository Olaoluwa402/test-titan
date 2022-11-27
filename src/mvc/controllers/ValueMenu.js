import { ValueMenu } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

// @desc Create a service
// @route POST /api/v1/services
// @access Private - admin

const createValueMenu = catchAsyncErrors(async (req, res, next) => {
  const { desc, title, icon, valueId } = req.body;

  const rgx = /^http/gi;

  let imageResolved;
  let imageIdResolved;

  if (icon && rgx.test(icon)) {
    imageResolved = icon;
  }

  //upload to cloudinary helper function
  if (icon && !rgx.test(icon)) {
    const result = await uploadToCloudinary(icon, "image");
    imageResolved = result.secure_url;
    imageIdResolved = result.public_id;
  }

  //create value
  const value = await ValueMenu.create({
    desc,
    title,
    valueId,
    icon: imageResolved,
    iconId: imageIdResolved,
  });

  res.status(200).json({
    status: "success",
    value,
  });
});

// @desc Get values
// @route GET /api/v1/values
// @access Public
const getValueMenus = catchAsyncErrors(async (req, res, next) => {
  //find all values
  const values = await ValueMenu.findAll({});

  res.json({
    status: "success",
    values,
  });
});

// @desc Get value
// @route GET /api/v1/values/:id
// @access Public
const getValueMenu = catchAsyncErrors(async (req, res, next) => {
  const valueId = req.query.id;

  //find value
  const value = await ValueMenu.findOne({ where: { id: valueId } });
  if (!value) {
    return next(new ErrorHandler("No record found"), 404);
  }

  res.status(200).json({
    status: "success",
    value,
  });
});

// @desc Update value
// @route PUT /api/v1/values/:id
// @access Private - admin only

const updateValueMenu = catchAsyncErrors(async (req, res, next) => {
  const valueMenuId = req.query.id;
  const { desc, title, icon, valueId } = req.body;

  //find faclity
  const value = await ValueMenu.findOne({ where: { id: valueMenuId } });

  if (!value) {
    throw new Error("No data found");
  }

  const rgx = /^http/gi;

  let imageResolved;
  let imageIdResolved;

  if (icon && rgx.test(icon)) {
    imageResolved = icon;
  }

  //upload to cloudinary helper function
  if (icon && !rgx.test(icon)) {
    const result = await uploadToCloudinary(icon, "image", value.iconId);
    imageResolved = result.secure_url;
    imageIdResolved = result.public_id;
  }

  value.icon =
    imageResolved && imageResolved !== value.icon ? imageResolved : value.icon;
  value.imageId =
    imageIdResolved && imageIdResolved !== value.iconId
      ? imageIdResolved
      : value.iconId;

  value.desc = desc && value.desc !== desc ? desc : value.desc;
  value.title = title && value.title !== title ? title : value.title;
  value.valueId =
    valueId && value.valueId !== valueId ? valueId : value.valueId;
  //save the updated record
  const updatedvalue = await value.save();

  res.status(200).json({
    status: "success",
    updatedvalue,
  });
});

// @desc delete values
// @route GET /api/v1/values/:id
// @access private - admin
const deleteValueMenu = catchAsyncErrors(async (req, res, next) => {
  const valueId = req.query.id;

  //find the facility
  const value = await ValueMenu.findOne({ where: { id: valueId } });
  if (!value) {
    return next(new ErrorHandler("No record found"), 404);
  }

  //remove found itemm
  await value.destroy();

  res.status(200).json({
    status: "success",
    message: "value removed successfully",
  });
});

export {
  createValueMenu,
  getValueMenu,
  getValueMenus,
  deleteValueMenu,
  updateValueMenu,
};
