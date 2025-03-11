import { Router } from "express";
import * as controller from "./book.controller.js";
import * as middleware from "../../middlewares/index.middlewares.js";
import * as schema from "./book.schema.js";
import { roles } from "../../utils/index.utils.js";

const { ADMIN, MODERATOR, USER } = roles;

const bookRouter = Router();

bookRouter
  .route("/")
  .get(
    middleware.auth,
    middleware.authorizeRoles(ADMIN, MODERATOR, USER),
    controller.getAllBooks
  )
  .post(
    middleware.auth,
    middleware.authorizeRoles(ADMIN, MODERATOR),
    middleware.validator(schema.createBookSchema),
    controller.createBook
  );

bookRouter
  .route("/:id")
  .get(
    middleware.auth,
    middleware.authorizeRoles(ADMIN, MODERATOR, USER),
    middleware.validator(schema.getBookSchema),
    controller.getBook
  )
  .put(
    middleware.auth,
    middleware.authorizeRoles(ADMIN, MODERATOR),
    middleware.validator(schema.updateBookSchema),
    controller.updateBook
  )
  .delete(
    middleware.auth,
    middleware.authorizeRoles(ADMIN),
    middleware.validator(schema.deleteBookSchema),
    controller.deleteBook
  );

export default bookRouter;
