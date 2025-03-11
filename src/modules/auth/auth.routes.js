import { Router } from "express";
import * as controller from "./auth.controller.js";
import * as middleware from "../../middlewares/index.middlewares.js";
import * as schema from "./auth.schema.js";
import { roles } from "../../utils/index.utils.js";

const { ADMIN, MODERATOR, USER } = roles;

const authRoute = Router();

authRoute.post(
  "/register",
  middleware.validator(schema.registerSchema),
  controller.register
);

authRoute.post(
  "/login",
  middleware.validator(schema.loginSchema),
  controller.login
);

authRoute.get(
  "/me",
  middleware.auth,
  middleware.authorizeRoles(ADMIN, MODERATOR, USER),
  controller.getMe
);

export default authRoute;
