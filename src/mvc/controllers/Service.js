import { Service } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { deleteText } from "../../components/FsUtil.js";

// @desc Create a service
// @route POST /api/v1/services
// @access Private - admin

const createService = catchAsyncErrors(async (req, res, next) => {
  const image = req.file.filename;
  const { desc, title } = req.body;
  //create service
  const service = await Service.create({
    desc,
    title,
    image,
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
  const image = req.file && req.file.filename ? req.file.filename : "";
  const { desc, title } = req.body;

  //find faclity
  const service = await Service.findOne({ where: { id: serviceId } });

  if (!service) {
    throw new Error("No data found");
  }

  //remove old file from server
  if (image) {
    await deleteText(`public/${service.image}`);
  }
  service.image = image && image !== service.image ? image : service.image;

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

  await deleteText(`public/${service.image}`);
  //remove found itemm
  await service.destroy();

  res.status(200).json({
    status: "success",
    message: "Service removed successfully",
  });
});

export { createService, getService, getServices, deleteService, updateService };
