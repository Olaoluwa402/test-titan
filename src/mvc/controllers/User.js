import generateToken from "../utils/generateToken.js";
import { Property, User } from "../models/central.js";
import bcrypt from "bcryptjs";
import { Membership } from "../models/central.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// @desc Login user
// @route POST /api/v1/users/login
// @access Public

const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  //find the user email
  const user = await User.scope("withPassword").findOne({
    where: { email: email },
  });
  //   check for password match
  const matchPassword = async function (passwordToBeVerified) {
    return await bcrypt.compare(passwordToBeVerified, user.password);
  };

  //   check that email exist
  if (user && (await matchPassword(password))) {
    res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      emailIsVerified: user.emailIsVerified,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register user
// @route POST /api/v1/users
// @access Public

const register = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  try {
    //check that user does not exist
    const userExist = await User.findOne({ where: { email: email } });
    if (userExist) {
      throw new Error("Email already exist");
    }

    //create user
    const user = await User.create({
      email,
      password,
      role,
    });

    res.status(200).json({
      status: "success",
      user: {
        role: user.role,
        emailIsVerified: user.emailIsVerified,
        id: user.id,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "fail",
      error: err.message,
    });
  }
});

// @desc Get all users
// @route GET /api/v1/users
// @access Private - admin only

const getUsers = catchAsyncErrors(async (req, res, next) => {
  //find all users
  const users = await User.findAll({
    include: [
      {
        model: Property,
        as: "properties",
      },
    ],
  });
  res.json({
    status: "success",
    users,
  });
});

// @desc GET user
// @route GET /api/v1/users/:id
// @access Private - client and admin only
const getUser = catchAsyncErrors(async (req, res, next) => {
  const userId = req.query.id;
  //find a user
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return next(new ErrorHandler("No record found"), 404);
  }
  res.status(200).json({
    status: "success",
    user,
  });
});

// @desc Update user role
// @route PUT /api/v1/users/:id
// @access Private - admin only

const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const userId = req.query.id;
  const { role, password, previousPassword } = req.body;

  //find all users
  const user = await User.scope("withPassword").findOne({
    where: { id: userId },
  });

  if (!user) {
    return next(new ErrorHandler("No record found"), 404);
  }
  //update role
  user.role = role && user.role !== role ? role : user.role;

  if (password && previousPassword) {
    //   check for previous password match
    const matchPassword = async function (passwordToBeVerified) {
      return await bcrypt.compare(passwordToBeVerified, user.password);
    };
    const isMatched = await matchPassword(previousPassword);
    console.log(userId, role, previousPassword, user.password, "role");
    if (!isMatched) {
      return next(new ErrorHandler("Incorrect previous password"), 400);
    }
    user.password = password;
  }

  //save the updated record
  const updatedUser = await user.save();
  res.status(200).json({
    status: "success",
    updatedUser,
  });
});

// @desc Delete user
// @route DELETE /api/v1/users/:id
// @access Private - admin only
const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const userId = req.query.id;
  //find the user
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return next(new ErrorHandler("No record found"), 404);
  }

  const member = await Membership.findOne({ where: { email: user.email } });
  if (member) {
    await member.destroy();
  }

  //remove found user
  await user.destroy();
  res.status(200).json({
    status: "success",
    message: "user removed successfully",
  });
});

export { login, register, getUsers, updateUserRole, deleteUser, getUser };
