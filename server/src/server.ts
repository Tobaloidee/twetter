// Imports
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import expressPino from "express-pino-logger";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import passport from "passport";

// Passport config
import PassportConfig from "./config/passport.config";

// Routes
import { authRoutes } from "./routes/AuthRoutes";
import { messageRoutes } from "./routes/MessageRoutes";

// Utils
import Logger from "./utils/logger";

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configureDatabase();
    this.configurePassport();
    this.configureMiddlewares();
    this.configureRoutes();
  }

  public get(): express.Application {
    return this.app;
  }

  private async configureDatabase(): Promise<void> {
    try {
      await mongoose
        .connect("mongodb://localhost:27017/twetter", {
          useCreateIndex: true,
          useNewUrlParser: true
        })
        .then(() =>
          Logger.info(
            "Connection to the database has been sucessfully established."
          )
        );
    } catch (error) {
      Logger.error(error);
    }
  }

  private configureMiddlewares(): void {
    this.app.use(expressPino({ logger: Logger }));
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
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/users", messageRoutes);
  }
}

export default new Server().get();
