import nc from "next-connect";
import {
  authorizeUser,
  protect,
  csrfProtection,
} from "../../../mvc/middlewares/auth.js";
import onError from "../../../mvc/middlewares/error.js";
import { getTeams, createTeam } from "../../../mvc/controllers/Team.js";
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

handler.use(morgan("dev"), cors(), cookieParser()).get(getTeams);

handler
  .use(
    morgan("dev"),
    cors(),
    cookieParser(),
    uploadFile,
    protect,
    authorizeUser(["admin", "super-admin"])
  )
  .post(createTeam);

export default handler;
