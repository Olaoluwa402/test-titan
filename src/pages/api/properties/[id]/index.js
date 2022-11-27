import nc from "next-connect";
import {
  authorizeUser,
  protect,
  csrfProtection,
} from "../../../../mvc/middlewares/auth.js";
import onError from "../../../../mvc/middlewares/error.js";
import {
  deleteProperty,
  getProperty,
  updateProperty,
} from "../../../../mvc/controllers/Property.js";
// import selectOption from "../../../components/selectOptions";

import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// route handler middleware
const handler = nc({ onError });

handler.use(morgan("dev"), cors(), cookieParser()).get(getProperty);

handler
  .use(morgan("dev"), cors(), cookieParser(), protect, authorizeUser(["admin"]))
  .put(updateProperty);

handler
  .use(morgan("dev"), cors(), cookieParser(), protect, authorizeUser(["admin"]))
  .delete(deleteProperty);

export default handler;