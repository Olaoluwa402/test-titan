import { Setting } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// @desc Create a setting
// @route POST /api/v1/settings
// @access Private - admin

const createSetting = catchAsyncErrors(async (req, res, next) => {
  const {
    ourVisionTitle,
    ourVisionText,
    ourVisionImage,
    ourServiceTitle,
    ourServiceText,
    ourServiceImage,
    aboutUsImage,
    selectPriceRangePlaceholder,
    selectPropertyPlaceholder,
    aboutUsText,
    aboutUsTitle,
    email,
    company_address,
    phone,
    getQuoteCTA,
    selectLocationPlaceholder,
    selectBedroomAmountPlaceholder,
  } = req.body;

  //create setting
  const setting = await Setting.create({
    ourVisionText,
    ourVisionImage,
    aboutUsImage,
    ourVisionTitle,
    selectPriceRangePlaceholder,
    selectPropertyPlaceholder,
    aboutUsText,
    aboutUsTitle,
    ourServiceTitle,
    ourServiceText,
    ourServiceImage,
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
    ourVisionText,
    ourVisionImage,
    aboutUsImage,
    ourVisionTitle,
    selectPriceRangePlaceholder,
    selectPropertyPlaceholder,
    aboutUsText,
    aboutUsTitle,
    ourServiceTitle,
    ourServiceText,
    ourServiceImage,
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

  const rgx = /^http/gi;

  let imageResolved;
  let imageIdResolved;

  let imageResolved_2;
  let imageIdResolved_2;

  let imageResolved_3;
  let imageIdResolved_3;

  if (ourVisionImage && rgx.test(ourVisionImage)) {
    imageResolved = ourVisionImage;
  }

  //upload to cloudinary helper function
  if (ourVisionImage && !rgx.test(ourVisionImage)) {
    const result = await uploadToCloudinary(
      ourVisionImage,
      "image",
      setting.ourVisionImageId
    );
    imageResolved = result.secure_url;
    imageIdResolved = result.public_id;
  }

  if (ourServiceImage && rgx.test(ourServiceImage)) {
    imageResolved_3 = ourServiceImage;
  }

  //upload to cloudinary helper function
  if (ourServiceImage && !rgx.test(ourServiceImage)) {
    const result = await uploadToCloudinary(
      ourServiceImage,
      "image",
      setting.ourServiceImageId
    );
    imageResolved_3 = result.secure_url;
    imageIdResolved_3 = result.public_id;
  }

  if (aboutUsImage && rgx.test(aboutUsImage)) {
    imageResolved_2 = aboutUsImage;
  }

  //upload to cloudinary helper function
  if (aboutUsImage && !rgx.test(aboutUsImage)) {
    const result = await uploadToCloudinary(
      aboutUsImage,
      "image",
      setting.aboutUsImageId
    );
    imageResolved_2 = result.secure_url;
    imageIdResolved_2 = result.public_id;
  }

  setting.ourVisionText =
    ourVisionText && setting.ourVisionText !== ourVisionText
      ? ourVisionText
      : setting.ourVisionText;
  setting.ourVisionImage =
    imageResolved && setting.ourVisionImage !== imageResolved
      ? imageResolved
      : setting.ourVisionImage;
  setting.ourVisionImageId =
    imageIdResolved && setting.ourVisionImageId !== imageIdResolved
      ? imageIdResolved
      : setting.ourVisionImageId;
  setting.aboutUsImageId =
    imageIdResolved_2 && setting.aboutUsImageId !== imageIdResolved_2
      ? imageIdResolved_2
      : setting.aboutUsImageId;
  setting.aboutUsImage =
    imageResolved_2 && setting.aboutUsImage !== imageResolved_2
      ? imageResolved_2
      : setting.aboutUsImage;
  setting.ourVisionTitle =
    ourVisionTitle && setting.ourVisionTitle !== ourVisionTitle
      ? ourVisionTitle
      : setting.ourVisionTitle;
  setting.selectPriceRangePlaceholder =
    selectPriceRangePlaceholder &&
    setting.selectPriceRangePlaceholder !== selectPriceRangePlaceholder
      ? selectPriceRangePlaceholder
      : setting.selectPriceRangePlaceholder;
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
  setting.aboutUsText =
    aboutUsText && setting.aboutUsText !== aboutUsText
      ? aboutUsText
      : setting.aboutUsText;
  setting.company_address =
    company_address && setting.company_address !== company_address
      ? company_address
      : setting.company_address;
  setting.aboutUsTitle =
    aboutUsTitle && setting.aboutUsTitle !== aboutUsTitle
      ? aboutUsTitle
      : setting.aboutUsTitle;
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

  setting.ourServiceText =
    ourServiceText && setting.ourServiceText !== ourServiceText
      ? ourServiceText
      : setting.ourServiceText;
  setting.ourServiceTitle =
    ourServiceTitle && setting.ourServiceTitle !== ourServiceTitle
      ? ourServiceTitle
      : setting.ourServiceTitle;
  setting.ourServiceImage =
    imageResolved && setting.ourServiceImage !== imageResolved_3
      ? imageResolved_3
      : setting.ourServiceImage;
  setting.ourServiceImageId =
    imageIdResolved && setting.ourServiceImageId !== imageIdResolved_3
      ? imageIdResolved_3
      : setting.ourServiceImageId;

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
