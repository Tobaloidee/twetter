// Imports
import mongoose from "mongoose";

// Utils
import Logger from "./utils/logger";

export default class Database {
  public static async connectDatabase() {
    try {
      mongoose.connection.once("connected", () => {
        Logger.info(
          "Connection to the database has been sucessfully established."
        );
      });

      mongoose.connection.on("error", err => Logger.error(err));

      process.on("SIGINT", async () => {
        await mongoose.connection.close(() => {
          Logger.info(
            "Mongoose default connection disconnected through app termination."
          );
          process.exit(0);
        });
      });

      await mongoose.connect("mongodb://localhost:27017/twetter", {
        useCreateIndex: true,
        useNewUrlParser: true
      });
    } catch (error) {
      Logger.error(error);
    }
  }
}
