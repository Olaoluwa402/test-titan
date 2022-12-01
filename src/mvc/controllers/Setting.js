import { Setting } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// @desc Create a setting
// @route POST /api/v1/settings
// @access Private - admin

const createSetting = catchAsyncErrors(async (req, res, next) => {
  const {
    selectPriceRangePlaceholder,
    selectPropertyPlaceholder,
    email,
    company_address,
    phone,
    getQuoteCTA,
    selectLocationPlaceholder,
    selectBedroomAmountPlaceholder,
  } = req.body;

  //create setting
  const setting = await Setting.create({
    selectPriceRangePlaceholder,
    selectPropertyPlaceholder,
    company_address,
    email,
    phone,
    getQuoteCTA,
    selectLocationPlaceholder,
    selectBedroomAmountPlaceholder,
  });

  res.status(200).json({
    status: "success",
    setting,
  });
});

// @desc Get settings
// @route GET /api/v1/settings
// @access Public
const getSettings = catchAsyncErrors(async (req, res, next) => {
  //find all settings
  const settings = await Setting.findAll({});

  res.json({
    status: "success",
    settings,
  });
});

// @desc Get setting
// @route GET /api/v1/settings/:id
// @access Public
const getSetting = catchAsyncErrors(async (req, res, next) => {
  const settingId = req.query.id;

  //find setting
  const setting = await Setting.findOne({ where: { id: settingId } });
  if (!setting) {
    return next(new ErrorHandler("No record found"), 404);
  }

  res.status(200).json({
    status: "success",
    setting,
  });
});

// @desc Update setting
// @route PUT /api/v1/settings/:id
// @access Private - admin only

const updateSetting = catchAsyncErrors(async (req, res, next) => {
  const settingId = req.query.id;
  const {
    selectPriceRangePlaceholder,
    selectPropertyPlaceholder,
    company_address,
    email,
    phone,
    getQuoteCTA,
    selectLocationPlaceholder,
    selectBedroomAmountPlaceholder,
  } = req.body;

  //find setting
  const setting = await Setting.findOne({ where: { id: settingId } });

  if (!setting) {
    return next(new ErrorHandler("No record found"), 404);
  }

  setting.selectPriceRangePlaceholder =
    selectPriceRangePlaceholder &&
    setting.selectPriceRangePlaceholder !== selectPriceRangePlaceholder
      ? selectPriceRangePlaceholder
      : setting.selectPriceRangePlaceholder;

  setting.selectPropertyPlaceholder =
    selectPropertyPlaceholder &&
    setting.selectPropertyPlaceholder !== selectPropertyPlaceholder
      ? selectPropertyPlaceholder
      : setting.selectPropertyPlaceholder;

  setting.company_address =
    company_address && setting.company_address !== company_address
      ? company_address
      : setting.company_address;

  setting.email = email && setting.email !== email ? email : setting.email;
  setting.phone = phone && setting.phone !== phone ? phone : setting.phone;
  setting.getQuoteCTA =
    getQuoteCTA && setting.getQuoteCTA !== getQuoteCTA
      ? getQuoteCTA
      : setting.getQuoteCTA;
  setting.selectLocationPlaceholder =
    selectLocationPlaceholder &&
    setting.selectLocationPlaceholder !== selectLocationPlaceholder
      ? selectLocationPlaceholder
      : setting.selectLocationPlaceholder;
  setting.selectBedroomAmountPlaceholder =
    selectBedroomAmountPlaceholder &&
    setting.selectBedroomAmountPlaceholder !== selectBedroomAmountPlaceholder
      ? selectBedroomAmountPlaceholder
      : setting.selectBedroomAmountPlaceholder;

  //save the updated record
  const updatedSetting = await setting.save();

  res.status(200).json({
    status: "success",
    updatedSetting,
  });
});

// @desc delete setting
// @route GET /api/v1/settings/:id
// @access private - admin
const deleteSetting = catchAsyncErrors(async (req, res, next) => {
  const settingId = req.query.id;

  //find the setting
  const setting = await Setting.findOne({ where: { id: settingId } });
  if (!setting) {
    return next(new ErrorHandler("No record found"), 404);
  }

  //remove found itemm
  await setting.destroy();

  res.status(200).json({
    status: "success",
    message: "setting removed successfully",
  });
});

export { createSetting, getSetting, getSettings, deleteSetting, updateSetting };
