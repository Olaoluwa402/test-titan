import nc from "next-connect";
import {
  authorizeUser,
  protect,
  csrfProtection,
} from "../../../../mvc/middlewares/auth.js";
import onError from "../../../../mvc/middlewares/error.js";
import {
  deleteAbout,
  updateAbout,
  getAbout,
} from "../../../../mvc/controllers/About.js";
import { upload } from "../../../../components/Multer.js";
// import selectOption from "../../../components/selectOptions";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// upload to server
let uploadFile = upload.single("image");

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
  .get(getAbout);

handler
  .use(
    morgan("dev"),
    cors(),
    cookieParser(),
    protect,
    authorizeUser(["admin", "super-admin"]),
    uploadFile
  )
  .put(updateAbout);

handler
  .use(
    morgan("dev"),
    cors(),
    cookieParser(),
    protect,
    authorizeUser(["admin", "super-admin"])
  )
  .delete(deleteAbout);

export default handler;
