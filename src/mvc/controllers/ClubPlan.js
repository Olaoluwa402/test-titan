import db from "../database/db.js";
import { ClubPlan } from "../models/central.js";
import { Membership } from "../models/central.js";
import { ClubPlanBenefit } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// @desc Create a club plan
// @route POST /api/v1/club_plans
// @access Private - admin

const createClubPlan = catchAsyncErrors(async (req, res, next) => {
  const { title, price, short_desc, long_desc } = req.body;

  //create club plan
  const clubPlan = await ClubPlan.create({
    title,
    price,
    short_desc,
    long_desc,
  });

  res.status(200).json({
    status: "success",
    clubPlan,
  });
});

// @desc Get club plans
// @route GET /api/v1/club_plans
// @access Private - admin
const getClubPlans = catchAsyncErrors(async (req, res, next) => {
  //find all club plans
  const clubPlans = await ClubPlan.findAll({
    include: [
      {
        model: Membership,
        as: "members",
      },
      { model: ClubPlanBenefit, as: "benefits" },
    ],
  });

  res.json({
    status: "success",
    clubPlans,
  });
});

// @desc Get club plan
// @route GET /api/v1/club_plans/:id
// @access Private - admin
const getClubPlan = catchAsyncErrors(async (req, res, next) => {
  const planId = req.query.id;
  //find club plan
  const clubPlan = await ClubPlan.findOne({ where: { id: planId } });
  if (!clubPlan) {
    return next(new ErrorHandler("No record found", 404));
  }
  res.status(200).json({
    status: "success",
    clubPlan,
  });
});

// @desc Update club plan
// @route PUT /api/v1/club_plans/:id
// @access Private - admin only

const updateClubPlan = catchAsyncErrors(async (req, res, next) => {
  const planId = req.query.id;
  const { title, price, short_desc, long_desc } = req.body;
  //find club plan
  const clubPlan = await ClubPlan.findOne({ where: { id: planId } });
  if (!clubPlan) {
    return next(new ErrorHandler("No record found", 404));
  }

  clubPlan.title = title && clubPlan.title !== title ? title : clubPlan.title;
  clubPlan.price = price && clubPlan.price !== price ? price : clubPlan.price;
  clubPlan.short_desc =
    short_desc && clubPlan.short_desc !== short_desc
      ? short_desc
      : clubPlan.short_desc;
  clubPlan.short_desc =
    title && clubPlan.title !== title ? title : clubPlan.title;
  clubPlan.long_desc =
    long_desc && clubPlan.long_desc !== long_desc
      ? long_desc
      : clubPlan.long_desc;

  //save the updated record
  const updatedClubPlan = await clubPlan.save();
  res.status(200).json({
    status: "success",
    updatedClubPlan,
  });
});

// @desc delete club plan
// @route GET /api/v1/club_plans/:id
// @access Private - admin
const deleteClubPlan = catchAsyncErrors(async (req, res, next) => {
  const planId = req.query.id;
  //find the club plan
  const clubPlan = await ClubPlan.findOne({ where: { id: planId } });
  if (!clubPlan) {
    return next(new ErrorHandler("No record found", 404));
  }
  //remove found itemm
  await clubPlan.destroy();
  res.status(200).json({
    status: "success",
    message: "user removed successfully",
  });
});

export {
  createClubPlan,
  getClubPlan,
  getClubPlans,
  deleteClubPlan,
  updateClubPlan,
};
