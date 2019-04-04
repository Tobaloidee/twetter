// Imports
import express, { Request, Response, Router } from "express";
import passport from "passport";

// Controllers
import { messageController } from "../controllers/MessageController";

class MessageRoutes {
  public router: Router = express.Router({ mergeParams: true });

  constructor() {
    this.deleteRoutes();
    this.getRoutes();
    this.postRoutes();
  }

  private deleteRoutes(): void {
    this.router.delete(
      "/:id/messages/:message_id",
      passport.authenticate("jwt", { session: false }),
      (req: Request, res: Response) => messageController.delete(req, res)
    );
  }

  private getRoutes(): void {
    this.router.get("/messages", (req: Request, res: Response) =>
      messageController.root(req, res)
    );

    this.router.get(
      "/:id/messages/:message_id",
      (req: Request, res: Response) => messageController.get(req, res)
    );
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
