import nc from "next-connect";
import {
  authorizeUser,
  protect,
  csrfProtection,
} from "../../../mvc/middlewares/auth.js";
import onError from "../../../mvc/middlewares/error.js";
import {
  getAllPropertyAddedAdvantage,
  createPropertyAddedAdvantage,
} from "../../../mvc/controllers/PropertyAddedAdvantage";
import { upload } from "../../../components/Multer.js";
// import selectOption from "../../../components/selectOptions";

export const config = {
  api: {
    bodyParser: false,
  },
};

let uploadFile = upload.single("icon");

import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// route handler middleware
const handler = nc({ onError });

handler
  .use(morgan("dev"), cors(), cookieParser())
  .get(getAllPropertyAddedAdvantage);
handler
  .use(morgan("dev"), cors(), cookieParser(), uploadFile)
  .post(createPropertyAddedAdvantage);

export default handler;
