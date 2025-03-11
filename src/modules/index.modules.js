import { AppError } from "../utils/index.utils.js ";
import { globalErrorHandler } from "../middlewares/index.middlewares.js";

import bookRouter from "./book/book.routes.js";
import authRouter from "./auth/auth.routes.js";

const bootstrap = (app) => {
  app.get("/", (req, res) => {
    res.send("Server is running");
  });

  app.use("/api/v1/books", bookRouter);
  app.use("/api/v1/auth", authRouter);

  // 404 Handler
  app.use("*", (req, res, next) => {
    next(
      new AppError(
        404,
        `This Route Not Found, ${req.method} ${req.originalUrl}`
      )
    );
  });

  // Global Error Handler
  app.use(globalErrorHandler);
};

export { bootstrap };
