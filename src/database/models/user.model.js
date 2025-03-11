import mongoose from "mongoose";
import { createHash, roles } from "../../utils/index.utils.js";

const { Schema, model, models } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(roles),
      default: roles.USER,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await createHash(this.password);
  next();
});

export const User = models.User || model("User", userSchema);
