import { User } from "../../database/models/index.models.js";
import { asyncHandler } from "../../middlewares/index.middlewares.js";
import {
  AppError,
  createToken,
  compareHash,
  roles,
} from "../../utils/index.utils.js";

import config from "../../../config/config.js";

const sendResponseWithToken = (user, statusCode, res) => {
  const token = createToken({ _id: user._id });

  const cookieOptions = {
    expires: new Date(
      Date.now() + parseInt(config.JWT_COOKIES_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Prevents access to cookies via JavaScript (XSS protection)
    sameSite: "Strict", // Prevents CSRF attacks
  };

  if (config.NODE_ENV === "production") {
    cookieOptions.secure = true; // Ensures cookies are sent over HTTPS
  }

  res.cookie("token", token, cookieOptions);
  return res
    .status(statusCode)
    .json({ status: "success", data: { token, user } });
};

const register = asyncHandler(async (req, res, next) => {
  const { username, password, role } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return next(new AppError(409, "user already exist"));
  }
  const newUser = await User.create({
    username,
    password,
    role: role || roles.USER,
  });

  newUser.password = undefined;
  sendResponseWithToken(newUser, 201, res);
});

const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await compareHash(password, user.password))) {
    return next(new AppError(401, "invalid credentials"));
  }
  user.password = undefined;
  sendResponseWithToken(user, 200, res);
});

const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ status: "success", data: user });
});

/*
export const logout = (req, res,next) => {
 const cookieOptions = {
    httpOnly: true,
    sameSite: "Strict",
 }

   if (config.NODE_ENV === "production") {
    cookieOptions.secure = true; // Ensures cookies are sent over HTTPS
  }

  res.clearCookie("token",cookieOptions);
  res.status(200).json({ message: "Logout successful" });
};
*/
export { register, login, getMe };
