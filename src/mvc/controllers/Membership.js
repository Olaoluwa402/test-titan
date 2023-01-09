import db from "../database/db.js";

import { ClubPlan } from "../models/central.js";
import { Membership } from "../models/central.js";
import { User } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// @desc Create member
// @route POST /api/v1/members
// @access Public

const createMember = catchAsyncErrors(async (req, res, next) => {
  const {
    firstname,
    lastname,
    job_title,
    email,
    phone,
    marital_Status,
    employment_status,
    clubPlanId,
    heard_about,
    refer_friend,
  } = req.body.detail;

  //check that user does not exist
  const memberExist = await Membership.findOne({ where: { email: email } });
  if (memberExist) {
    throw new Error(
      "Email already exist, A member account already registered with the email"
    );
  }

  //check that user does not exist
  const userExist = await User.findOne({ where: { email: email } });

  if (userExist && userExist.MembershipId !== null) {
    throw new Error("Email already exist");
  }

  const user = await User.create({
    email,
    password: "12345",
    role: "client",
  });

  //create member
  const member = await Membership.create({
    firstname,
    lastname,
    email,
    job_title,
    phone,
    marital_Status,
    employment_status,
    clubPlanId,
    membershipId: user.id,
    heard_about,
    refer_friend,
  });

  res.status(200).json({
    status: "success",
    member,
  });
});

// @desc Get members
// @route GET /api/v1/members
// @access Private - admin
const getMembers = catchAsyncErrors(async (req, res, next) => {
  //find all members
  const members = await Membership.findAll({
    include: [
      {
        model: ClubPlan,
        as: "clubPlan",
      },
    ],
  });
  res.json({
    status: "success",
    members,
  });
});

// @desc Get member
// @route GET /api/v1/members/:id
// @access Private - member/admin
const getMember = catchAsyncErrors(async (req, res, next) => {
  const memberId = req.query.id;
  //find member
  const member = await Membership.findOne({
    where: { id: memberId },
    include: [
      {
        model: ClubPlan,
        as: "clubPlan",
      },
    ],
  });

  if (!member) {
    return next(new ErrorHandler("No record found"), 404);
  }
  res.status(200).json({
    status: "success",
    member,
  });
});

// @desc Update member
// @route PUT /api/v1/members/:id
// @access Private - admin only

const updateMember = catchAsyncErrors(async (req, res, next) => {
  const memberId = req.query.id;
  const {
    firstname,
    lastname,
    job_title,
    email,
    phone,
    marital_Status,
    employment_status,
    clubPlanId,
    heard_about,
    refer_friend,
  } = req.body;
  //find all members
  const member = await Membership.findOne({ where: { id: memberId } });

  if (!member) {
    return next(new ErrorHandler("No record found"), 404);
  }

  member.firstname =
    firstname && member.firstname !== firstname ? firstname : member.firstname;

  member.lastname =
    lastname && member.lastname !== lastname ? lastname : member.lastname;

  member.job_title =
    job_title && member.job_title !== job_title ? job_title : member.job_title;
  member.email = email && member.email !== email ? email : member.email;
  member.phone = phone && member.phone !== phone ? phone : member.phone;

  member.marital_Status =
    marital_Status && member.marital_Status !== marital_Status
      ? marital_Status
      : member.marital_Status;
  member.employment_status =
    employment_status && member.employment_status !== employment_status
      ? employment_status
      : member.employment_status;
  member.clubPlanId =
    clubPlanId && member.clubPlanId !== clubPlanId
      ? clubPlanId
      : member.clubPlanId;
  // member.referralId =
  //   referralId && member.referralId !== referralId
  //     ? referralId
  //     : member.referralId;
  member.heard_about =
    heard_about && member.heard_about !== heard_about
      ? heard_about
      : member.heard_about;
  member.refer_friend =
    refer_friend && member.refer_friend !== refer_friend
      ? refer_friend
      : member.refer_friend;
  //save the updated record
  const updatedMember = await member.save();
  res.status(200).json({
    status: "success",
    updatedMember,
  });
});

// @desc delete member
// @route GET /api/v1/members/:id
// @access Private - admin
const deleteMember = catchAsyncErrors(async (req, res, next) => {
  const memberId = req.query.id;
  //find the user
  const member = await Membership.findOne({ where: { id: memberId } });
  if (!member) {
    return next(new ErrorHandler("No record found"), 404);
  }

  const user = await User.findOne({ where: { email: member.email } });
  if (user) {
    //remove found user
    await user.destroy();
  }
  //remove found user
  await member.destroy();
  res.status(200).json({
    status: "success",
    message: "member removed successfully",
  });
});

export { createMember, getMember, getMembers, deleteMember, updateMember };
