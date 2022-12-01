import db from "../database/db.js";
import { MenuItem } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { readText, deleteText } from "../../components/fsUtil.js";

// @desc Create a menu item
// @route POST /api/v1/menu_items
// @access Private - admin

const createMenuItem = catchAsyncErrors(async (req, res, next) => {
  const icon = req.file.filename;
  const { name, url } = req.body;

  //create club plan
  const menuItem = await MenuItem.create({
    name,
    url,
    icon,
  });

  res.status(200).json({
    status: "success",
    menuItem,
  });
});

// @desc Get menu items
// @route GET /api/v1/menu_items
// @access Private - admin
const getMenuItems = catchAsyncErrors(async (req, res, next) => {
  //find all menu_items
  const menuItems = await MenuItem.findAll({});

  res.json({
    status: "success",
    menuItems,
  });
});

// @desc Get menuItems
// @route GET /api/v1/menu_items/:id
// @access Private - admin
const getMenuItem = catchAsyncErrors(async (req, res, next) => {
  const menuItemId = req.query.id;
  //find club menuItems
  const menuItems = await MenuItem.findOne({ where: { id: menuItemId } });
  if (!menuItems) {
    return next(new ErrorHandler("No record found"), 404);
  }
  res.status(200).json({
    status: "success",
    menuItems,
  });
});

// @desc Update Menu Item
// @route GET /api/v1/menu_items/:id
// @access Private - admin only

const updateMenuItem = catchAsyncErrors(async (req, res, next) => {
  const menuItemId = req.query.id;
  const icon = req.file && req.file.filename ? req.file.filename : "";
  const { name, url } = req.body;
  //find Menu Item
  const menuItem = await MenuItem.findOne({ where: { id: menuItemId } });
  if (!menuItem) {
    return next(new ErrorHandler("No record found"), 404);
  }

  //remove old file from server
  if (icon) {
    await deleteText(`public/${menuItem.icon}`);
  }

  menuItem.name = name && menuItem.name !== name ? name : menuItem.name;
  menuItem.icon = icon && menuItem.icon !== icon ? icon : menuItem.icon;
  menuItem.url = url && menuItem.url !== url ? url : menuItem.url;

  //save the updated record
  const updatedMenuItem = await menuItem.save();
  res.status(200).json({
    status: "success",
    updatedMenuItem,
  });
});

// @desc delete menuItem
// @route GET /api/v1/menuItems/:id
// @access Private - admin
const deleteMenuItems = catchAsyncErrors(async (req, res, next) => {
  const menuItemsId = req.query.id;
  //find the menuItem menuItems
  const menuItem = await MenuItem.findOne({ where: { id: menuItemsId } });
  if (!menuItem) {
    return next(new ErrorHandler("No record found"), 404);
  }

  await deleteText(`public/${menuItem.icon}`);
  //remove found itemm
  await menuItem.destroy();
  res.status(200).json({
    status: "success",
    message: "user removed successfully",
  });
});

export {
  createMenuItem,
  getMenuItem,
  getMenuItems,
  deleteMenuItems,
  updateMenuItem,
};
