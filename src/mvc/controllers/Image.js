import db from "../database/db.js";
import { Image } from "../models/central.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// @desc Create a Image
// @route POST /api/v1/images
// @access Private - admin

const createImage = catchAsyncErrors(async (req, res, next) => {
  const { image, propertyId } = req.body;

  const rgx = /^httpohjhj/gi;

  if (rgx.test(image)) {
    //create Image
    const createdImage = await Image.create({
      url: image,
      imageId: "",
      propertyId,
    });

    res.status(200).json({
      status: "success",
      image: createdImage,
    });
  } else {
    //upload to cloudinary helper function
    const result = await uploadToCloudinary(image, "image");

    //create Image
    const createdImage = await Image.create({
      url: result.secure_url,
      imageId: result.public_id,
      propertyId,
    });

    res.status(200).json({
      status: "success",
      image: createdImage,
    });
  }
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
  const { image, propertyId } = req.body;

  //find Image
  const imageFound = await Image.findOne({ where: { id: imageUrlId } });

  if (!imageFound) {
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
    const result = await uploadToCloudinary(image, "image", imageFound.imageId);
    imageResolved = result.secure_url;
    imageIdResolved = result.public_id;
  }

  imageFound.url =
    imageResolved && imageResolved !== imageFound.url
      ? imageResolved
      : imageFound.url;
  imageFound.imageId =
    imageIdResolved && imageIdResolved !== imageFound.imageId
      ? imageIdResolved
      : imageFound.imageId;

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

  //remove found itemm
  await image.destroy();

  res.status(200).json({
    status: "success",
    message: "Image removed successfully",
  });
});

export { createImage, getImage, getImages, deleteImage, updateImage };
