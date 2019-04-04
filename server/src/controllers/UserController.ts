// Imports
import argon2 from "argon2";
import { badRequest } from "boom";
import { Request, Response } from "express";

// User Model
import User from "../models/User";

// Utils
import Logger from "../utils/logger";

export class UserController {
  public async register(req: Request, res: Response) {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json(badRequest("Email is already in use.", user.email));
      } else {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password,
          profileImageURL: req.body.profileImageURL,
          username: req.body.username
        });

        const hash = await argon2.hash(newUser.password);

        newUser.password = hash;

        try {
          const userToSave = await newUser.save();
          return res.status(201).json(userToSave);
        } catch (error) {
          Logger.error(error);
        }
      }
    } catch (error) {
      Logger.error(error);
    }
  }
}

export const userController = new UserController();
