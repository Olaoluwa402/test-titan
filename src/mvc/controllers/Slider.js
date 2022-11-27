import { Slider } from "../models/central.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// @desc Create a slider
// @route POST /api/v1/sliders
// @access Private - admin

const createSlider = catchAsyncErrors(async (req, res, next) => {
  const { image, url, description, title } = req.body;

  const rgx = /^http/gi;

  if (rgx.test(image)) {
    //create slider
    const slider = await Slider.create({
      image,
      imageId: "",
      title,
      url,
      description,
    });

    res.status(200).json({
      status: "success",
      slider,
    });
  } else {
    //upload to cloudinary helper function
    const result = await uploadToCloudinary(image, "image");

    //create slider
    const slider = await Slider.create({
      image: result.secure_url,
      imageId: result.public_id,
      title,
      url,
      description,
    });

    res.status(200).json({
      status: "success",
      slider,
    });
  }
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
  const { image, url, description, title } = req.body;

  //find slider
  const slider = await Slider.findOne({ where: { id: sliderId } });

  if (!slider) {
    return next(new ErrorHandler("No record found"), 404);
  }

  const rgx = /^http/gi;

  let imageResolved;
  let imageIdResolved;

  if (image && rgx.test(image)) {
    imageResolved = image;
  }

  //upload to cloudinary helper function
  if (image && !rgx.test(image)) {
    const result = await uploadToCloudinary(image, "image", slider.imageId);
    imageResolved = result.secure_url;
    imageIdResolved = result.public_id;
  }

  slider.image =
    imageResolved && imageResolved !== slider.image
      ? imageResolved
      : slider.image;
  slider.imageId =
    imageIdResolved && imageIdResolved !== slider.imageId
      ? imageIdResolved
      : slider.imageId;
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

  //remove found itemm
  await slider.destroy();

  res.status(200).json({
    status: "success",
    message: "slider removed successfully",
  });
});

export { createSlider, getSlider, getSliders, deleteSlider, updateSlider };
