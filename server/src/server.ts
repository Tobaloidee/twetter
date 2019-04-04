// Imports
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import expressPino from "express-pino-logger";
import helmet from "helmet";
import mongoose from "mongoose";
import { StatsD } from "node-statsd";
import passport from "passport";
import responseTime from "response-time";

// Passport config
import PassportConfig from "./config/passport.config";

// Routes
import { authRoutes } from "./routes/AuthRoutes";
import { messageRoutes } from "./routes/MessageRoutes";

// Utils
import Logger from "./utils/logger";

class Server {
  private app: express.Application;
  private stats: StatsD;

  constructor() {
    this.app = express();
    this.stats = new StatsD();

    this.stats.socket.on("error", err => {
      Logger.error(err.message);
    });

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
    this.app.use(
      responseTime((req, res, time) => {
        if (req.method) {
          const stat = (req.method + req.url)
            .toLowerCase()
            .replace(/[:.]/g, "")
            .replace(/\//g, "_");
          this.stats.timing(stat, time);
        }
      })
    );
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
