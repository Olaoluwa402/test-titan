import { Value } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

// @desc Create a service
// @route POST /api/v1/services
// @access Private - admin

const createValue = catchAsyncErrors(async (req, res, next) => {
  const { desc, title, image } = req.body;

  const rgx = /^http/gi;

  let imageResolved;
  let imageIdResolved;

  if (image && rgx.test(image)) {
    imageResolved = image;
  }

  //upload to cloudinary helper function
  if (image && !rgx.test(image)) {
    const result = await uploadToCloudinary(image, "image");
    imageResolved = result.secure_url;
    imageIdResolved = result.public_id;
  }

  //create value
  const value = await Value.create({
    desc,
    title,
    image: imageResolved,
    imageId: imageIdResolved,
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
    include: [{ model: valueMenu, as: "valueMenu" }],
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
  const { desc, title, image } = req.body;

  //find faclity
  const value = await Value.findOne({ where: { id: valueId } });

  if (!value) {
    throw new Error("No data found");
  }

  const rgx = /^http/gi;

  let imageResolved;
  let imageIdResolved;

  if (image && rgx.test(image)) {
    imageResolved = image;
  }

  //upload to cloudinary helper function
  if (image && !rgx.test(image)) {
    const result = await uploadToCloudinary(image, "image", value.imageId);
    imageResolved = result.secure_url;
    imageIdResolved = result.public_id;
  }

  value.image =
    imageResolved && imageResolved !== value.image
      ? imageResolved
      : value.image;
  value.imageId =
    imageIdResolved && imageIdResolved !== value.imageId
      ? imageIdResolved
      : value.imageId;

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

  //remove found itemm
  await value.destroy();

  res.status(200).json({
    status: "success",
    message: "value removed successfully",
  });
});

export { createValue, getValue, getValues, deleteValue, updateValue };
