import db from "../database/db.js";
import { ClubPlanBenefit } from "../models/central.js";
import { ClubPlan } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// @desc Create a club plan benefit
// @route POST /api/v1/club_plan_benefits
// @access Private - admin

const createClubPlanBenefit = catchAsyncErrors(async (req, res, next) => {
  const { benefit, clubPlanId } = req.body;

  //create club plan
  const clubPlanBenefit = await ClubPlanBenefit.create({
    benefit,
    clubPlanId,
  });

  res.status(200).json({
    status: "success",
    clubPlanBenefit,
  });
});

// @desc Get club plan benefits
// @route GET /api/v1/club_plan_benefits
// @access Private - admin
const getClubPlanBenefits = catchAsyncErrors(async (req, res, next) => {
  //find all club plans
  const clubPlanBenefits = await ClubPlanBenefit.findAll({
    include: [
      {
        model: ClubPlan,
        as: "membershipPlan",
      },
    ],
  });

  res.json({
    status: "success",
    clubPlanBenefits,
  });
});

// @desc Get club plan benefits
// @route GET /api/v1/club_plan_benefits/:id
// @access Private - admin
const getClubPlanBenefit = catchAsyncErrors(async (req, res, next) => {
  const id = req.query.id;
  //find club plan
  const clubPlanBenefit = await ClubPlanBenefit.findOne({ where: { id: id } });
  if (!clubPlanBenefit) {
    return next(new ErrorHandler("No record found"), 404);
  }
  res.status(200).json({
    status: "success",
    clubPlanBenefit,
  });
});

// @desc Update club plan
// @route PUT /api/v1/club_plans/:id
// @access Private - admin only

const updateClubPlanBenefit = catchAsyncErrors(async (req, res, next) => {
  const id = req.query.id;
  const { benefit, clubPlanId } = req.body;
  //find club plan benefit
  const clubPlanBenefit = await ClubPlanBenefit.findOne({ where: { id: id } });
  if (!clubPlanBenefit) {
    return next(new ErrorHandler("No record found"), 404);
  }

  clubPlanBenefit.benefit =
    benefit && clubPlanBenefit.benefit !== benefit
      ? benefit
      : clubPlanBenefit.benefit;
  clubPlanBenefit.clubPlanId =
    clubPlanId && clubPlanBenefit.clubPlanId !== clubPlanId
      ? clubPlanId
      : clubPlanBenefit.clubPlanId;

  //save the updated record
  const updatedClubPlanBenefit = await clubPlanBenefit.save();
  res.status(200).json({
    status: "success",
    updatedClubPlanBenefit,
  });
});

// @desc delete club plan
// @route GET /api/v1/club_plan_benefits/:id
// @access Private - admin
const deleteClubPlanBenefit = catchAsyncErrors(async (req, res, next) => {
  const id = req.query.id;
  //find the club plan
  const clubPlanBenefit = await ClubPlanBenefit.findOne({ where: { id: id } });
  if (!clubPlanBenefit) {
    res.status(404);
    return next(new ErrorHandler("No record found"), 404);
  }
  //remove found itemm
  await clubPlanBenefit.destroy();
  res.status(200).json({
    status: "success",
    message: "user removed successfully",
  });
});

export {
  createClubPlanBenefit,
  getClubPlanBenefit,
  getClubPlanBenefits,
  deleteClubPlanBenefit,
  updateClubPlanBenefit,
};
