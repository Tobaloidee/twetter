// Imports
import express, { Request, Response, Router } from "express";
import passport from "passport";

// Controllers
import { messageController } from "../controllers/MessageController";

class MessageRoutes {
  public router: Router = express.Router({ mergeParams: true });

  constructor() {
    this.postRoutes();
  }

  private postRoutes(): void {
    this.router.post(
      "/:id/messages",
      passport.authenticate("jwt", { session: false }),
      (req: Request, res: Response) => messageController.create(req, res)
    );
  }
}

export const messageRoutes = new MessageRoutes().router;
