import { connect } from "mongoose";
import config from "../../config/config.js";

const connectDB = () => {
  connect(config.MONGO_DB_URI)
    .then((conn) => {
      console.log(`Database connected: ${conn.connection.host}`);
    })
    .catch((error) => {
      console.error(`Database connection error: ${error.message}`);
      process.exit(1);
    });
};

export default connectDB;
