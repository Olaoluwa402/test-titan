import { ServiceMenu } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { deleteText } from "../../components/FsUtil.js";

// @desc Create a service
// @route POST /api/v1/services
// @access Private - admin

const createServiceMenu = catchAsyncErrors(async (req, res, next) => {
  const icon = req.file.filename;
  const { desc, title, serviceId } = req.body;

  //create service
  const service = await ServiceMenu.create({
    desc,
    title,
    serviceId,
    icon,
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
  const icon = req.file && req.file.filename ? req.file.filename : "";
  const { desc, title, serviceId } = req.body;

  //find faclity
  const service = await ServiceMenu.findOne({ where: { id: serviceMenuId } });

  if (!service) {
    throw new Error("No data found");
  }

  //remove old file from server
  if (icon) {
    console.log("deleted");
    await deleteText(`public/${service.icon}`);
  }

  service.icon = icon && icon !== service.icon ? icon : service.icon;

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

  //remove iage from server
  await deleteText(`public/${service.icon}`);
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
