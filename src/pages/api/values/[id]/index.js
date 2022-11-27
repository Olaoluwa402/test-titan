import nc from "next-connect";
import {
  authorizeUser,
  protect,
  csrfProtection,
} from "../../../../mvc/middlewares/auth.js";
import onError from "../../../../mvc/middlewares/error.js";
import {
  deleteValue,
  updateValue,
  getValue,
} from "../../../../mvc/controllers/Value.js";
// import selectOption from "../../../components/selectOptions";

import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// route handler middleware
const handler = nc({ onError });

handler
  .use(morgan("dev"), cors(), cookieParser(), protect, authorizeUser(["admin"]))
  .get(getValue);

handler
  .use(morgan("dev"), cors(), cookieParser(), protect, authorizeUser(["admin"]))
  .put(updateValue);

handler
  .use(morgan("dev"), cors(), cookieParser(), protect, authorizeUser(["admin"]))
  .delete(deleteValue);

export default handler;
