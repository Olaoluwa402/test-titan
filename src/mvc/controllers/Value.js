import { Value } from "../models/central.js";
import { ValueMenu } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { deleteText } from "../../components/FsUtil.js";
// @desc Create a service
// @route POST /api/v1/services
// @access Private - admin

const createValue = catchAsyncErrors(async (req, res, next) => {
  const image = req.file.filename;
  const { desc, title } = req.body;

  //create value
  const value = await Value.create({
    desc,
    title,
    image,
  });

  res.status(200).json({
    status: "success",
    value,
  });
});

// @desc Get values
// @route GET /api/v1/values
// @access Public
const getValues = catchAsyncErrors(async (req, res, next) => {
  //find all values
  const values = await Value.findAll({
    include: [{ model: ValueMenu, as: "ValueMenu" }],
  });

  res.json({
    status: "success",
    values,
  });
});

// @desc Get value
// @route GET /api/v1/values/:id
// @access Public
const getValue = catchAsyncErrors(async (req, res, next) => {
  const valueId = req.query.id;

  //find value
  const value = await Value.findOne({ where: { id: valueId } });
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

const updateValue = catchAsyncErrors(async (req, res, next) => {
  const valueId = req.query.id;
  const image = req.file && req.file.filename ? req.file.filename : "";
  const { desc, title } = req.body;

  //find faclity
  const value = await Value.findOne({ where: { id: valueId } });

  if (!value) {
    throw new Error("No data found");
  }

  //remove old file from server
  if (image) {
    console.log("deleted");
    await deleteText(`public/${value.image}`);
  }

  value.image = image && image !== value.image ? image : value.image;

  value.desc = desc && value.desc !== desc ? desc : value.desc;
  value.title = title && value.title !== title ? title : value.title;
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
const deleteValue = catchAsyncErrors(async (req, res, next) => {
  const valueId = req.query.id;

  //find the facility
  const value = await Value.findOne({ where: { id: valueId } });
  if (!value) {
    return next(new ErrorHandler("No record found"), 404);
  }

  await deleteText(`public/${value.image}`);
  //remove found itemm
  await value.destroy();

  res.status(200).json({
    status: "success",
    message: "value removed successfully",
  });
});

export { createValue, getValue, getValues, deleteValue, updateValue };
