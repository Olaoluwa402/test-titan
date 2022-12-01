import nc from "next-connect";
import {
  authorizeUser,
  protect,
  csrfProtection,
} from "../../../mvc/middlewares/auth.js";
import onError from "../../../mvc/middlewares/error.js";
import { getValues, createValue } from "../../../mvc/controllers/Value.js";
import { upload } from "../../../components/Multer.js";
// import selectOption from "../../../components/selectOptions";

import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
export const config = {
  api: {
    bodyParser: false,
  },
};

let uploadFile = upload.single("image");

// route handler middleware
const handler = nc({ onError });

handler.use(morgan("dev"), cors(), cookieParser()).get(getValues);
handler
  .use(morgan("dev"), cors(), cookieParser(), uploadFile)
  .post(createValue);

export default handler;
