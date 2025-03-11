import { asyncHandler } from "../middlewares/index.middlewares.js";
import { AppError } from "../utils/index.utils.js";

const hardDelete = async (Model, req, res, next) => {
  const doc = await Model.findOneAndDelete({ _id: req.params.id });
  // Not found
  if (!doc) {
    return next(new AppError(404, `${Model.modelName} not found`));
  }

  // Send Response
  return res.status(204).send();
};

const softDelete = async (Model, req, res, next) => {
  const doc = await Model.findOneAndUpdate(
    { _id: req.params.id, isDeleted: { $ne: true } }, // Ensure it's not already deleted
    { isDeleted: true, deletedAt: Date.now() },
    { new: true }
  );

  if (!doc) {
    return next(
      new AppError(404, `${Model.modelName} not found or already deleted`)
    );
  }

  // Send Response
  return res.status(200).json({ status: "success" });
};

/* ====== HANDLERS ======== */

/**
 * Retrieves all documents from the database that are not soft deleted.
 *
 * @param {import("mongoose").Model} Model - The Mongoose model to query.
 * @param {string | Object | Array<string | Object>} [populateOptions] - Optional population options for related documents.
 * @returns {Function} Express middleware function to handle the GET request.
 */
const getAll = (Model, populateOptions) => {
  return asyncHandler(async (req, res, next) => {
    const query = Model.find({ isDeleted: { $ne: true } });
    if (populateOptions) query.populate(populateOptions);
    const docs = await query;

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: docs,
    });
  });
};

/**
 * Retrieves a single document from the database by its ID.
 *
 * @param {import("mongoose").Model} Model - The Mongoose model to query.
 * @param {string | Object} [populateOptions] - Fields to populate, if any.
 * @returns {Function} Express middleware function to handle the request.
 */
const getOne = (Model, populateOptions) => {
  return asyncHandler(async (req, res, next) => {
    const query = Model.findById(req.params.id);
    if (populateOptions) query.populate(populateOptions);
    const doc = await query;

    // Not found
    if (!doc || doc.isDeleted)
      return next(new AppError(404, `${Model.modelName} not found`));

    // Send Response
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};

/**
 * Creates a new document in the database.
 *
 * @param {import("mongoose").Model} Model - The Mongoose model to create a document for.
 * @returns {Function} Express middleware function to handle the POST request.
 */
const createOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);
    // Send Response
    res.status(201).json({
      status: "success",
      data: doc,
    });
  });
};

/**
 * Updates a document by its ID.
 *
 * @param {import("mongoose").Model} Model - The Mongoose model to query.
 * @returns {Function} Express middleware function to handle the update request.
 */
const updateOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // Not found
    if (!doc) return next(new AppError(404, `${Model.modelName} not found`));

    // Send Response
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};

/**
 * Deletes a document from the database using either hard delete or soft delete.
 *
 * @param {import("mongoose").Model} Model - The Mongoose model to delete a document from.
 * @returns {Function} Express middleware to handle deletion.
 *
 * @description
 * - If `req.query.softDelete === "false"`, it performs a **hard delete** (permanent removal).
 * - Otherwise, it performs a **soft delete** (marks as deleted instead of removing).
 *
 * @example
 * // Hard delete: Removes the document permanently
 * DELETE /api/v1/resource/:id?softDelete=false
 *
 * // Soft delete: Marks the document as deleted (e.g., setting `deletedAt` timestamp)
 * DELETE /api/v1/resource/:id
 */
const deleteOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    // use hard delete
    if (req.query.softDelete === "false") {
      return await hardDelete(Model, req, res, next);
    }

    // use soft delete
    return await softDelete(Model, req, res, next);
  });
};

export { getAll, getOne, updateOne, createOne, deleteOne };
