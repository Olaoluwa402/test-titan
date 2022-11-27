import nc from "next-connect";
import {
  authorizeUser,
  protect,
  csrfProtection,
} from "../../mvc/middlewares/auth.js";
import onError from "../../mvc/middlewares/error.js";
import { getHomeData } from "../../mvc/controllers/Home.js";
// import selectOption from "../../../components/selectOptions";

import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// route handler middleware
const handler = nc({ onError });

handler.use(morgan("dev"), cors(), cookieParser()).get(getHomeData);

export default handler;
