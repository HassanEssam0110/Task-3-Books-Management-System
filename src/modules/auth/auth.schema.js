import Joi from "joi";
import { generalRoles } from "../../utils/index.utils.js";

const registerSchema = {
  body: Joi.object({
    username: generalRoles.username.required(),
    password: generalRoles.password.required(),
    repeat_password: generalRoles.repeat_password.required(),
    role: generalRoles.role.optional(),
  }),
};

const loginSchema = {
  body: Joi.object({
    username: generalRoles.username.required(),
    password: generalRoles.password.required(),
  }),
};

export { registerSchema, loginSchema };
