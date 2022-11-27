import dotenv from "dotenv";
// cofig connection
dotenv.config();
import JWT from "jsonwebtoken";
import catchAsyncErrors from "./catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import csrf from "csurf";
import { User } from "../models/central.js";

const protect = catchAsyncErrors(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = await JWT.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({ where: { id: decoded.id } });

      console.log(user, "authentication");

      req.user = user;
      next();
    } catch (err) {
      console.log(err.message);
      return next(new ErrorHandler(`${err.message}`, 401));
    }
  }

  if (!token) {
    return next(new ErrorHandler("No token, Not authorized!", 401));
  }
});

//user role authorization

const authorizeUser = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource.`,
          401
        )
      );
      // throw new Error(
      //   `Role (${req.user.role}) is not allowed to access this resource.`
      // );
    }

    next();
  };
};

const isSecure = process.env.NODE_ENV === "production" ? true : false;
// csurf protect config middleware
const csrfProtection = csrf({
  cookie: {
    key: "_cProtect",
    secure: isSecure,
    sameSite: "lax",
    httpOnly: "true",
  },
});

export { protect, authorizeUser, csrfProtection };
