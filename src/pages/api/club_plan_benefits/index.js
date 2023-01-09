import nc from "next-connect";
import {
  authorizeUser,
  protect,
  csrfProtection,
} from "../../../mvc/middlewares/auth.js";
import onError from "../../../mvc/middlewares/error.js";
import {
  getClubPlanBenefits,
  createClubPlanBenefit,
} from "../../../mvc/controllers/ClubPlanBenefit.js";
//import selectOption from "../../../../components/selectOptions";

import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

//const { corsOptions } = selectOption();
// route handler middleware
const handler = nc({ onError });

handler.use(morgan("dev"), cors(), cookieParser()).get(getClubPlanBenefits);
handler
  .use(
    morgan("dev"),
    cors(),
    cookieParser(),
    protect,
    authorizeUser(["admin", "super-admin"])
  )
  .post(createClubPlanBenefit);

export default handler;
