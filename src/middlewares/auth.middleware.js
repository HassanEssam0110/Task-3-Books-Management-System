import { User } from "../database/models/index.models.js";
import { asyncHandler } from "./index.middlewares.js";
import { AppError, verifyToken } from "../utils/index.utils.js";

const auth = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.token || req.header("Authorization");

  if (!token) {
    return next(new AppError(401, "Unauthorized: No token found."));
  }

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  // Validate token
  const { valid, decoded, message } = validateToken(token);
  if (!valid) {
    return next(new AppError(401, message));
  }

  // Check if user exists
  const user = await User.findById(decoded._id);
  if (!user) {
    return next(new AppError(401, "Unauthorized: User not found."));
  }

  // Attach user to request
  req.user = user;
  next();
});

// Token validation helper function
const validateToken = (token) => {
  try {
    const decoded = verifyToken(token);
    return { valid: true, expired: false, decoded };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return {
        valid: false,
        expired: true,
        decoded: null,
        message: "Token expired.",
      };
    }
    return {
      valid: false,
      expired: false,
      decoded: null,
      message: "Invalid token.",
    };
  }
};

export { auth };
