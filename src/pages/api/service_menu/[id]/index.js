import nc from "next-connect";
import {
  authorizeUser,
  protect,
  csrfProtection,
} from "../../../../mvc/middlewares/auth.js";
import onError from "../../../../mvc/middlewares/error.js";
import {
  deleteServiceMenu,
  updateServiceMenu,
  getServiceMenu,
} from "../../../../mvc/controllers/ServiceMenu.js";
import { upload } from "../../../../components/Multer.js";
// import selectOption from "../../../components/selectOptions";

export const config = {
  api: {
    bodyParser: false,
  },
};
// upload to server
let uploadFile = upload.single("icon");

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
  .get(getServiceMenu);

handler
  .use(
    morgan("dev"),
    cors(),
    cookieParser(),
    protect,
    authorizeUser(["admin", "super-admin"]),
    uploadFile
  )
  .put(updateServiceMenu);

handler
  .use(
    morgan("dev"),
    cors(),
    cookieParser(),
    protect,
    authorizeUser(["admin", "super-admin"])
  )
  .delete(deleteServiceMenu);

export default handler;
