// Imports
import { Request, Response } from "express";

export class UserController {
  public root(req: Request, res: Response) {
    res.status(200).send({ success: true });
  }
}

export const userController = new UserController();
