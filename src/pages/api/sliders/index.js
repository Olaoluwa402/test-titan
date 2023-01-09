import nc from "next-connect";
import {
  authorizeUser,
  protect,
  csrfProtection,
} from "../../../mvc/middlewares/auth.js";
import onError from "../../../mvc/middlewares/error.js";
import { getSliders, createSlider } from "../../../mvc/controllers/Slider.js";
import { upload } from "../../../components/Multer.js";
// import selectOption from "../../../components/selectOptions";

export const config = {
  api: {
    bodyParser: false,
  },
};

let uploadFile = upload.single("image");

import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// route handler middleware
const handler = nc({ onError });

handler.use(morgan("dev"), cors(), cookieParser()).get(getSliders);
handler
  .use(
    morgan("dev"),
    cors(),
    cookieParser(),
    protect,
    authorizeUser(["admin", "super-admin"]),
    uploadFile
  )
  .post(createSlider);

export default handler;
