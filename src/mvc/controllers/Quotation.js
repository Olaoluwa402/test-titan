import { Quotation } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// @desc Create a quotation
// @route POST /api/v1/quotations
// @access Private

const createQuotation = catchAsyncErrors(async (req, res, next) => {
  const { title, detail } = req.body;

  //create quotation
  const quotation = await Quotation.create({
    title,
    detail,
  });

  res.status(200).json({
    status: "success",
    quotation,
  });
});

// @desc Get quotations
// @route GET /api/v1/quotations
// @access Private
const getQuotations = catchAsyncErrors(async (req, res, next) => {
  //find all quotations
  const quotations = await Quotation.find({});

  res.json({
    status: "success",
    quotations,
  });
});

// @desc Get quotation
// @route GET /api/v1/quotations/:id
// @access Private
const getQuotation = catchAsyncErrors(async (req, res, next) => {
  const quotationId = req.query.id;

  //find quotation
  const quotation = await Quotation.findOne({ where: { id: quotationId } });
  if (!quotation) {
    return next(new ErrorHandler("No record found"), 404);
  }

  res.status(200).json({
    status: "success",
    quotation,
  });
});

// @desc Update quotation
// @route PUT /api/v1/quotations/:id
// @access Private - admin only

const updateQuotation = catchAsyncErrors(async (req, res, next) => {
  const quotationId = req.query.id;
  const { title, detail } = req.body;

  //find quotation
  const quotation = await Quotation.findOne({ where: { id: quotationId } });

  if (!quotation) {
    return next(new ErrorHandler("No record found"), 404);
  }

  quotation.title =
    title && quotation.title !== title ? title : quotation.title;
  quotation.detail =
    detail && quotation.detail !== detail ? detail : quotation.detail;

  //save the updated record
  const updatedQuotation = await quotation.save();

  res.status(200).json({
    status: "success",
    updatedQuotation,
  });
});

// @desc delete quotation
// @route GET /api/v1/quotations/:id
// @access private - admin
const deleteQuotation = catchAsyncErrors(async (req, res, next) => {
  const quotationId = req.query.id;

  //find the quotation
  const quotation = await Quotation.findOne({ where: { id: quotationId } });
  if (!quotation) {
    return next(new ErrorHandler("No record found"), 404);
  }

  //remove found itemm
  await quotation.destroy();

  res.status(200).json({
    status: "success",
    message: "quotation removed successfully",
  });
});

export {
  createQuotation,
  getQuotation,
  getQuotations,
  deleteQuotation,
  updateQuotation,
};
