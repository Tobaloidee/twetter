// Imports
import express, { Request, Response, Router } from "express";

// Controllers
import { userController } from "../controllers/UserController";

class UserRoutes {
  public router: Router = express.Router();

  constructor() {
    this.getRoutes();
  }

  private getRoutes(): void {
    this.router.get("/", (req: Request, res: Response) =>
      userController.root(req, res)
    );
  }
}

export const userRoutes = new UserRoutes().router;
