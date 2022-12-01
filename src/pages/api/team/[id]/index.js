import nc from "next-connect";
import {
  authorizeUser,
  protect,
  csrfProtection,
} from "../../../../mvc/middlewares/auth.js";
import onError from "../../../../mvc/middlewares/error.js";
import {
  deleteTeam,
  updateTeam,
  getTeam,
} from "../../../../mvc/controllers/Team.js";
import { upload } from "../../../../components/Multer.js";
// import selectOption from "../../../components/selectOptions";

import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

export const config = {
  api: {
    bodyParser: false,
  },
};
// upload to server
let uploadFile = upload.single("image");

// route handler middleware
const handler = nc({ onError });

handler
  .use(morgan("dev"), cors(), cookieParser(), protect, authorizeUser(["admin"]))
  .get(getTeam);

handler
  .use(
    morgan("dev"),
    cors(),
    cookieParser(),
    protect,
    authorizeUser(["admin"]),
    uploadFile
  )
  .put(updateTeam);

handler
  .use(morgan("dev"), cors(), cookieParser(), protect, authorizeUser(["admin"]))
  .delete(deleteTeam);

export default handler;
