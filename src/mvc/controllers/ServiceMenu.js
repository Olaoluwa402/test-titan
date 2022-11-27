import { ServiceMenu } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

// @desc Create a service
// @route POST /api/v1/services
// @access Private - admin

const createServiceMenu = catchAsyncErrors(async (req, res, next) => {
  const { desc, title, icon, serviceId } = req.body;

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

  //create service
  const service = await ServiceMenu.create({
    desc,
    title,
    serviceId,
    icon: imageResolved,
    iconId: imageIdResolved,
  });

  res.status(200).json({
    status: "success",
    service,
  });
});

// @desc Get services
// @route GET /api/v1/services
// @access Public
const getAllServicesMenu = catchAsyncErrors(async (req, res, next) => {
  //find all services
  const services = await ServiceMenu.findAll({});

  res.json({
    status: "success",
    services,
  });
});

// @desc Get service
// @route GET /api/v1/Services/:id
// @access Public
const getServiceMenu = catchAsyncErrors(async (req, res, next) => {
  const serviceId = req.query.id;

  //find service
  const service = await ServiceMenu.findOne({ where: { id: serviceId } });
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

const updateServiceMenu = catchAsyncErrors(async (req, res, next) => {
  const serviceMenuId = req.query.id;
  const { desc, title, icon, serviceId } = req.body;

  //find faclity
  const service = await ServiceMenu.findOne({ where: { id: serviceMenuId } });

  if (!service) {
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
    const result = await uploadToCloudinary(image, "image", service.iconId);
    imageResolved = result.secure_url;
    imageIdResolved = result.public_id;
  }

  service.icon =
    imageResolved && imageResolved !== service.icon
      ? imageResolved
      : service.icon;
  service.iconId =
    imageIdResolved && imageIdResolved !== service.iconId
      ? imageIdResolved
      : service.iconId;

  service.desc = desc && service.desc !== desc ? desc : service.desc;
  service.title = title && service.title !== title ? title : service.title;
  service.serviceId =
    serviceId && service.serviceId !== serviceId
      ? serviceId
      : service.serviceId;
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
const deleteServiceMenu = catchAsyncErrors(async (req, res, next) => {
  const serviceId = req.query.id;

  //find the facility
  const service = await ServiceMenu.findOne({ where: { id: serviceId } });
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

export {
  createServiceMenu,
  getServiceMenu,
  getAllServicesMenu,
  deleteServiceMenu,
  updateServiceMenu,
};
