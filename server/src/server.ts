// Imports
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import expressPino from "express-pino-logger";
import helmet from "helmet";
import passport from "passport";
import responseTime from "response-time";

// Database
import Database from "./database";

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
    Database.connectDatabase();
    this.configurePassport();
    this.configureMiddlewares();
    this.configureRoutes();
  }

  public get(): express.Application {
    return this.app;
  }

  private configureMiddlewares(): void {
    this.app.use(expressPino({ logger: Logger }));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cors()); // TODO Set the origin later
    this.app.use(helmet());
    this.app.use(compression({ level: 6 }));
    this.app.use(responseTime());
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
