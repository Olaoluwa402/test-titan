import { Vision } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { deleteText } from "../../components/FsUtil.js";

// @desc Create a vision
// @route POST /api/v1/visions
// @access Private - admin

const createVision = catchAsyncErrors(async (req, res, next) => {
  const image = req.file.filename;
  const { desc, title } = req.body;
  //create vision
  const vision = await Vision.create({
    desc,
    title,
    image,
  });

  res.status(200).json({
    status: "success",
    vision,
  });
});

// @desc Get visions
// @route GET /api/v1/visions
// @access Public
const getVisions = catchAsyncErrors(async (req, res, next) => {
  //find all visions
  const visions = await Vision.findAll({});

  res.json({
    status: "success",
    visions,
  });
});

// @desc Get vision
// @route GET /api/v1/visions/:id
// @access Public
const getVision = catchAsyncErrors(async (req, res, next) => {
  const visionId = req.query.id;

  //find vision
  const vision = await Vision.findOne({ where: { id: visionId } });
  if (!vision) {
    return next(new ErrorHandler("No record found"), 404);
  }

  res.status(200).json({
    status: "success",
    vision,
  });
});

// @desc Update vision
// @route PUT /api/v1/visions/:id
// @access Private - admin only

const updateVision = catchAsyncErrors(async (req, res, next) => {
  const visionId = req.query.id;
  const image = req.file && req.file.filename ? req.file.filename : "";
  const { desc, title } = req.body;

  //find faclity
  const vision = await Vision.findOne({ where: { id: visionId } });

  if (!vision) {
    throw new Error("No data found");
  }

  //remove old file from server
  if (image) {
    await deleteText(`public/${vision.image}`);
  }
  vision.image = image && image !== vision.image ? image : vision.image;

  vision.desc = desc && vision.desc !== desc ? desc : vision.desc;
  vision.title = title && vision.title !== title ? title : vision.title;
  //save the updated record
  const updatedvision = await vision.save();

  res.status(200).json({
    status: "success",
    updatedvision,
  });
});

// @desc delete visions
// @route GET /api/v1/visions/:id
// @access private - admin
const deleteVision = catchAsyncErrors(async (req, res, next) => {
  const visionId = req.query.id;

  //find the facility
  const vision = await Vision.findOne({ where: { id: visionId } });
  if (!vision) {
    return next(new ErrorHandler("No record found"), 404);
  }

  await deleteText(`public/${vision.image}`);
  //remove found itemm
  await vision.destroy();

  res.status(200).json({
    status: "success",
    message: "removed successfully",
  });
});

export { createVision, getVision, getVisions, deleteVision, updateVision };
