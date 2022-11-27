import { Team } from "../models/central.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// @desc Create a team
// @route POST /api/v1/teams
// @access Private - admin

const createTeam = catchAsyncErrors(async (req, res, next) => {
  const { image, name, designation } = req.body;

  const rgx = /^http/gi;

  if (rgx.test(image)) {
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
  } else {
    //upload to cloudinary helper function
    const result = await uploadToCloudinary(image, "image");

    //create team
    const team = await Team.create({
      image: result.secure_url,
      imageId: result.public_id,
      name,
      designation,
    });

    res.status(200).json({
      status: "success",
      team,
    });
  }
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
  const { image, name, designation } = req.body;

  //find team
  const team = await Team.findOne({ where: { id: teamId } });

  if (!team) {
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
    const result = await uploadToCloudinary(image, "image", team.imageId);
    imageResolved = result.secure_url;
    imageIdResolved = result.public_id;
  }

  team.image =
    imageResolved && imageResolved !== team.image ? imageResolved : team.image;
  team.imageId =
    imageIdResolved && imageIdResolved !== team.imageId
      ? imageIdResolved
      : team.imageId;
  team.name = name && name !== team.name ? name : team.name;
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

  //remove found itemm
  await team.destroy();

  res.status(200).json({
    status: "success",
    message: "team removed successfully",
  });
});

export { createTeam, getTeam, getTeams, deleteTeam, updateTeam };
