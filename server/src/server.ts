// Imports
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configureMiddlewares();
  }

  public get(): express.Application {
    return this.app;
  }

  private configureMiddlewares(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cors()); // TODO Set the origin later
    this.app.use(helmet());
    this.app.use(compression({ level: 6 }));
  }
}

export default new Server().get();
