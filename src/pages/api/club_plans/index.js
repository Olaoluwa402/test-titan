import nc from "next-connect";
import {
  authorizeUser,
  protect,
  csrfProtection,
} from "../../../mvc/middlewares/auth.js";
import onError from "../../../mvc/middlewares/error.js";
import {
  getClubPlans,
  createClubPlan,
} from "../../../mvc/controllers/ClubPlan.js";
// import selectOption from "../../../components/selectOptions";

import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// route handler middleware
const handler = nc({ onError });

handler.use(morgan("dev"), cors(), cookieParser()).get(getClubPlans);
handler.use(morgan("dev"), cors(), cookieParser()).post(createClubPlan);

export default handler;
