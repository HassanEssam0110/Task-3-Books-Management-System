import path from "path";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: path.resolve(".env") }); // Load environment variables

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_COOKIES_EXPIRES_IN: process.env.JWT_COOKIES_EXPIRES_IN,
};

export default config;
