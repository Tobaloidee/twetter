// Imports
import express, { Request, Response, Router } from "express";

// Controllers
import { userController } from "../controllers/UserController";

class UserRoutes {
  public router: Router = express.Router();

  constructor() {
    this.postRoutes();
  }

  private postRoutes(): void {
    this.router.post("/register", (req: Request, res: Response) =>
      userController.register(req, res)
    );
  }
}

export const userRoutes = new UserRoutes().router;
