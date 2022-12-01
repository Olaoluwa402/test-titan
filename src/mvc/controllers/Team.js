import { Team } from "../models/central.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { readText, deleteText } from "../../components/fsUtil.js";

// @desc Create a team
// @route POST /api/v1/teams
// @access Private - admin

const createTeam = catchAsyncErrors(async (req, res, next) => {
  // console.log("req.body", req.body);
  const image = req.file.filename;
  const { name, designation } = req.body;

  //create team
  const team = await Team.create({
    image: image,
    imageId: "",
    name,
    designation,
  });

  res.status(200).json({
    status: "success",
    team,
  });
});

// @desc Get teams
// @route GET /api/v1/teams
// @access Public
const getTeams = catchAsyncErrors(async (req, res, next) => {
  //find all teams
  const teams = await Team.findAll({});

  res.json({
    status: "success",
    teams,
  });
});

// @desc Get team
// @route GET /api/v1/teams/:id
// @access Public
const getTeam = catchAsyncErrors(async (req, res, next) => {
  const teamId = req.query.id;

  //find team
  const team = await Team.findOne({ where: { id: teamId } });
  if (!team) {
    return next(new ErrorHandler("No record found"), 404);
  }

  res.status(200).json({
    status: "success",
    team,
  });
});

// @desc Update team
// @route PUT /api/v1/teams/:id
// @access Private - admin only

const updateTeam = catchAsyncErrors(async (req, res, next) => {
  const teamId = req.query.id;
  const image = req.file && req.file.filename ? req.file.filename : "";
  const { name, designation } = req.body;
  console.log(image);
  //find team
  const team = await Team.findOne({ where: { id: teamId } });

  if (!team) {
    return next(new ErrorHandler("No record found"), 404);
  }
  if (image) {
    await deleteText(`public/${team.image}`);
  }

  team.image = image && image !== team.image ? image : team.image;
  team.imageId = team.name = name && name !== team.name ? name : team.name;
  team.designation =
    designation && designation !== team.designation
      ? designation
      : team.designation;

  // save record
  const updatedTeam = await team.save();

  res.status(200).json({
    status: "success",
    updatedTeam,
  });
});

// @desc delete team
// @route GET /api/v1/teams/:id
// @access private - admin
const deleteTeam = catchAsyncErrors(async (req, res, next) => {
  const teamId = req.query.id;

  //find the team
  const team = await Team.findOne({ where: { id: teamId } });
  if (!team) {
    return next(new ErrorHandler("No record found"), 404);
  }

  await deleteText(`public/${team.image}`);
  //remove found itemm
  await team.destroy();

  res.status(200).json({
    status: "success",
    message: "team removed successfully",
  });
});

export { createTeam, getTeam, getTeams, deleteTeam, updateTeam };
