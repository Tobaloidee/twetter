// Imports
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import passport from "passport";

// Passport config
import PassportConfig from "./config/passport.config";

// Routes
import { userRoutes } from "./routes/UserRoutes";

// Utils
import Logger from "./utils/logger";

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configureDatabase();
    this.configurePassport();
    this.configureRoutes();
    this.configureMiddlewares();
  }

  public get(): express.Application {
    return this.app;
  }

  private async configureDatabase(): Promise<void> {
    try {
      mongoose.connect("mongodb://db:27017/twetter", {
        useCreateIndex: true,
        useNewUrlParser: true
      });

      Logger.info(
        "Connection to the database has been sucessfully established."
      );
    } catch (error) {
      Logger.error(error);
    }
  }

  private configureMiddlewares(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cors()); // TODO Set the origin later
    this.app.use(helmet());
    this.app.use(compression({ level: 6 }));
  }

  private configurePassport(): void {
    PassportConfig(passport);
    this.app.use(passport.initialize());
  }

  private configureRoutes(): void {
    this.app.use("/api/users", userRoutes);
  }
}

export default new Server().get();
