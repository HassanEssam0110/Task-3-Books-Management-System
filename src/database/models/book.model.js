import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      type: String,
      trim: true,
      required: true,
    },
    publishedDate: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Book = models.Book || model("Book", bookSchema);
