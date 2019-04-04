// Imports
import express, { Request, Response, Router } from "express";

// Controllers
import { authController } from "../controllers/AuthController";

class AuthRoutes {
  public router: Router = express.Router();

  constructor() {
    this.postRoutes();
  }

  private postRoutes(): void {
    this.router.post("/login", (req: Request, res: Response) =>
      authController.login(req, res)
    );

    this.router.post("/register", (req: Request, res: Response) =>
      authController.register(req, res)
    );
  }
}

export const authRoutes = new AuthRoutes().router;
