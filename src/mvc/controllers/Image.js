import db from "../database/db.js";
import { Image } from "../models/central.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { deleteText } from "../../components/FsUtil.js";

// @desc Create a Image
// @route POST /api/v1/images
// @access Private - admin

const createImage = catchAsyncErrors(async (req, res, next) => {
  const { propertyId } = req.body;
  const image = req.file.filename;

  //create Image
  const createdImage = await Image.create({
    url: image,
    propertyId,
  });

  res.status(200).json({
    status: "success",
    image: createdImage,
  });
});

// @desc Get Images
// @route GET /api/v1/Images
// @access Public
const getImages = catchAsyncErrors(async (req, res, next) => {
  //find all Images
  const images = await Image.findAll({ model: Property });

  res.json({
    status: "success",
    images,
  });
});

// @desc Get Image
// @route GET /api/v1/images/:id
// @access Public
const getImage = catchAsyncErrors(async (req, res, next) => {
  const imageId = req.query.id;

  //find image
  const image = await Image.findOne({ where: { id: imageId } });
  if (!image) {
    return next(new ErrorHandler("No record found"), 404);
  }

  res.status(200).json({
    status: "success",
    image,
  });
});

// @desc Update Image
// @route PUT /api/v1/images/:id
// @access Private - admin only

const updateImage = catchAsyncErrors(async (req, res, next) => {
  const imageUrlId = req.query.id;
  const { propertyId } = req.body;
  const image = req.file && req.file.filename ? req.file.filename : "";

  //find Image
  const imageFound = await Image.findOne({ where: { id: imageUrlId } });

  if (!imageFound) {
    return next(new ErrorHandler("No record found"), 404);
  }

  //remove old file from server
  if (image) {
    console.log("deleted");
    await deleteText(`public/${imageFound.url}`);
  }

  imageFound.url = image && image !== imageFound.url ? image : imageFound.url;
  imageFound.propertyId =
    propertyId && propertyId !== imageFound.propertyId
      ? propertyId
      : imageFound.propertyId;

  //save the updated record
  const updatedImage = await imageFound.save();

  res.status(200).json({
    status: "success",
    updatedImage,
  });
});

// @desc delete Image
// @route GET /api/v1/Images/:id
// @access private - admin
const deleteImage = catchAsyncErrors(async (req, res, next) => {
  const imageId = req.query.id;

  //find the Image
  const image = await Image.findOne({ where: { id: imageId } });
  if (!image) {
    return next(new ErrorHandler("No record found"), 404);
  }

  await deleteText(`public/${image.url}`);
  //remove found itemm
  await image.destroy();

  res.status(200).json({
    status: "success",
    message: "Image removed successfully",
  });
});

export { createImage, getImage, getImages, deleteImage, updateImage };
