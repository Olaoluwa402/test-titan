import { About } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { deleteText } from "../../components/FsUtil.js";

// @desc Create a about
// @route POST /api/v1/abouts
// @access Private - admin

const createAbout = catchAsyncErrors(async (req, res, next) => {
  const image = req.file.filename;
  const { desc, title } = req.body;
  //create about
  const about = await About.create({
    desc,
    title,
    image,
  });

  res.status(200).json({
    status: "success",
    about,
  });
});

// @desc Get abouts
// @route GET /api/v1/abouts
// @access Public
const getAbouts = catchAsyncErrors(async (req, res, next) => {
  //find all abouts
  const abouts = await About.findAll();

  res.json({
    status: "success",
    abouts,
  });
});

// @desc Get about
// @route GET /api/v1/abouts/:id
// @access Public
const getAbout = catchAsyncErrors(async (req, res, next) => {
  const aboutId = req.query.id;

  //find about
  const about = await About.findOne({ where: { id: aboutId } });
  if (!about) {
    return next(new ErrorHandler("No record found"), 404);
  }

  res.status(200).json({
    status: "success",
    about,
  });
});

// @desc Update about
// @route PUT /api/v1/abouts/:id
// @access Private - admin only

const updateAbout = catchAsyncErrors(async (req, res, next) => {
  const aboutId = req.query.id;
  const image = req.file && req.file.filename ? req.file.filename : "";
  console.log(req.file, "body");

  const { title, desc } = req.body;

  //find faclity
  const about = await About.findOne({ where: { id: aboutId } });

  if (!about) {
    throw new Error("No data found");
  }

  //remove old file from server
  if (image) {
    await deleteText(`public/${about.image}`);
  }
  about.image = image && image !== about.image ? image : about.image;

  about.desc = desc && about.desc !== desc ? desc : about.desc;
  about.title = title && about.title !== title ? title : about.title;
  //save the updated record
  const updatedabout = await about.save();

  res.status(200).json({
    status: "success",
    updatedabout,
  });
});

// @desc delete abouts
// @route GET /api/v1/abouts/:id
// @access private - admin
const deleteAbout = catchAsyncErrors(async (req, res, next) => {
  const aboutId = req.query.id;

  //find the facility
  const about = await About.findOne({ where: { id: aboutId } });
  if (!about) {
    return next(new ErrorHandler("No record found"), 404);
  }

  await deleteText(`public/${about.image}`);
  //remove found itemm
  await about.destroy();

  res.status(200).json({
    status: "success",
    message: "about removed successfully",
  });
});

export { createAbout, getAbout, getAbouts, deleteAbout, updateAbout };
