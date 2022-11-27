import { Service } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

// @desc Create a service
// @route POST /api/v1/services
// @access Private - admin

const createService = catchAsyncErrors(async (req, res, next) => {
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

  //create service
  const service = await Service.create({
    desc,
    title,
    image: imageResolved,
    imageId: imageIdResolved,
  });

  res.status(200).json({
    status: "success",
    service,
  });
});

// @desc Get services
// @route GET /api/v1/services
// @access Public
const getServices = catchAsyncErrors(async (req, res, next) => {
  //find all services
  const services = await Service.findAll({
    include: [{ model: ServiceMenu, as: "ServiceMenu" }],
  });

  res.json({
    status: "success",
    services,
  });
});

// @desc Get service
// @route GET /api/v1/Services/:id
// @access Public
const getService = catchAsyncErrors(async (req, res, next) => {
  const serviceId = req.query.id;

  //find service
  const service = await Service.findOne({ where: { id: serviceId } });
  if (!service) {
    return next(new ErrorHandler("No record found"), 404);
  }

  res.status(200).json({
    status: "success",
    service,
  });
});

// @desc Update service
// @route PUT /api/v1/Services/:id
// @access Private - admin only

const updateService = catchAsyncErrors(async (req, res, next) => {
  const serviceId = req.query.id;
  const { desc, title, image } = req.body;

  //find faclity
  const service = await Service.findOne({ where: { id: serviceId } });

  if (!service) {
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
    const result = await uploadToCloudinary(image, "image", service.imageId);
    imageResolved = result.secure_url;
    imageIdResolved = result.public_id;
  }

  service.image =
    imageResolved && imageResolved !== service.image
      ? imageResolved
      : service.image;
  service.imageId =
    imageIdResolved && imageIdResolved !== service.imageId
      ? imageIdResolved
      : service.imageId;

  service.desc = desc && service.desc !== desc ? desc : service.desc;
  service.title = title && service.title !== title ? title : service.title;
  //save the updated record
  const updatedService = await service.save();

  res.status(200).json({
    status: "success",
    updatedService,
  });
});

// @desc delete services
// @route GET /api/v1/services/:id
// @access private - admin
const deleteService = catchAsyncErrors(async (req, res, next) => {
  const serviceId = req.query.id;

  //find the facility
  const service = await Service.findOne({ where: { id: serviceId } });
  if (!service) {
    return next(new ErrorHandler("No record found"), 404);
  }

  //remove found itemm
  await service.destroy();

  res.status(200).json({
    status: "success",
    message: "Service removed successfully",
  });
});

export { createService, getService, getServices, deleteService, updateService };
