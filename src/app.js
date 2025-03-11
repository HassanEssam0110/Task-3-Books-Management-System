import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import compression from "compression";
import config from "../config/config.js";
import { bootstrap } from "./modules/index.modules.js";

const app = express();

/* Middleware */
if (config.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies
app.use(compression()); // compress responses

/* Routes */
bootstrap(app);

export default app;
