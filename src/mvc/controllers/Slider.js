import { Slider } from "../models/central.js";

import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { deleteText } from "../../components/FsUtil.js";

// @desc Create a slider
// @route POST /api/v1/sliders
// @access Private - admin

const createSlider = catchAsyncErrors(async (req, res, next) => {
  const image = req.file.filename;
  const { url, description, title } = req.body;

  //create slider
  const slider = await Slider.create({
    image: image,
    imageId: "",
    title,
    url,
    description,
  });

  res.status(200).json({
    status: "success",
    slider,
  });
});

// @desc Get sliders
// @route GET /api/v1/sliders
// @access Public
const getSliders = catchAsyncErrors(async (req, res, next) => {
  //find all sliders
  const sliders = await Slider.findAll({});

  res.json({
    status: "success",
    sliders,
  });
});

// @desc Get slider
// @route GET /api/v1/sliders/:id
// @access Public
const getSlider = catchAsyncErrors(async (req, res, next) => {
  const sliderId = req.query.id;

  //find slider
  const slider = await Slider.findOne({ where: { id: sliderId } });
  if (!slider) {
    return next(new ErrorHandler("No record found"), 404);
  }

  res.status(200).json({
    status: "success",
    slider,
  });
});

// @desc Update slider
// @route PUT /api/v1/sliders/:id
// @access Private - admin only

const updateSlider = catchAsyncErrors(async (req, res, next) => {
  const sliderId = req.query.id;

  const image = req.file && req.file.filename ? req.file.filename : "";
  const { url, description, title } = req.body;

  //find slider
  const slider = await Slider.findOne({ where: { id: sliderId } });

  if (!slider) {
    return next(new ErrorHandler("No record found"), 404);
  }

  //remove old file from server
  if (image) {
    console.log("deleted");
    await deleteText(`public/${slider.image}`);
  }

  slider.image = image && image !== slider.image ? image : slider.image;
  slider.url = url && url !== slider.url ? url : slider.url;
  slider.description =
    description && description !== slider.description
      ? description
      : slider.description;
  slider.title = title && title !== slider.title ? title : slider.title;

  //save the updated record
  const updatedSlider = await slider.save();

  res.status(200).json({
    status: "success",
    updatedSlider,
  });
});

// @desc delete slider
// @route GET /api/v1/sliders/:id
// @access private - admin
const deleteSlider = catchAsyncErrors(async (req, res, next) => {
  const sliderId = req.query.id;

  //find the facility
  const slider = await Slider.findOne({ where: { id: sliderId } });
  if (!slider) {
    return next(new ErrorHandler("No record found"), 404);
  }

  await deleteText(`public/${slider.image}`);
  console.log("deleted fro server");
  //remove found itemm
  await slider.destroy();

  res.status(200).json({
    status: "success",
    message: "slider removed successfully",
  });
});

export { createSlider, getSlider, getSliders, deleteSlider, updateSlider };
