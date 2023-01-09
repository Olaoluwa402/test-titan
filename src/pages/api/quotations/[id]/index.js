import nc from "next-connect";
import { authorizeUser, protect } from "../../../../mvc/middlewares/auth.js";
import onError from "../../../../mvc/middlewares/error.js";
import {
  deleteQuotation,
  getQuotation,
  updateQuotation,
} from "../../../../mvc/controllers/Quotation.js";
// import selectOption from "../../../components/selectOptions";

import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// route handler middleware
const handler = nc({ onError });

handler
  .use(
    morgan("dev"),
    cors(),
    cookieParser(),
    protect,
    authorizeUser(["admin", "super-admin"])
  )
  .get(getQuotation);

handler
  .use(
    morgan("dev"),
    cors(),
    cookieParser(),
    protect,
    authorizeUser(["admin", "super-admin"])
  )
  .put(updateQuotation);

handler
  .use(
    morgan("dev"),
    cors(),
    cookieParser(),
    protect,
    authorizeUser(["admin", "super-admin"])
  )
  .delete(deleteQuotation);

export default handler;
