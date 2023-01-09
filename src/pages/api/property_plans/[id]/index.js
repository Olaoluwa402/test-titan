import nc from "next-connect";
import {
  authorizeUser,
  protect,
  csrfProtection,
} from "../../../../mvc/middlewares/auth.js";
import onError from "../../../../mvc/middlewares/error.js";
import {
  deletePlan,
  getPlan,
  updatePlan,
} from "../../../../mvc/controllers/PropertyPlan.js";
import { upload } from "../../../../components/Multer.js";
// import selectOption from "../../../components/selectOptions";

export const config = {
  api: {
    bodyParser: false,
  },
};
// upload to server
let uploadFile = upload.single("image");

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
  .get(getPlan);

handler
  .use(
    morgan("dev"),
    cors(),
    cookieParser(),
    protect,
    authorizeUser(["admin", "super-admin"]),
    uploadFile
  )
  .put(updatePlan);

handler
  .use(
    morgan("dev"),
    cors(),
    cookieParser(),
    protect,
    authorizeUser(["admin", "super-admin"])
  )
  .delete(deletePlan);

export default handler;
