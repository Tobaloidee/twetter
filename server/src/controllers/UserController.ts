// Imports
import argon2 from "argon2";
import { badRequest, internal, notFound } from "boom";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// User Model
import User from "../models/User";

// Utils
import Keys from "../config/keys.json";
import Logger from "../utils/logger";

export class UserController {
  public async login(req: Request, res: Response) {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json(notFound("User not found."));
      }

      const isMatch = await argon2.verify(user.password, req.body.password);

      if (isMatch) {
        const payload = {
          id: user.id,
          profileImageURL: user.profileImageURL,
          username: user.username
        };

        await jwt.sign(
          payload,
          Keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              return res
                .status(500)
                .json(
                  internal("An error occured while signing the jwt token.")
                );
            }

            return res.status(200).json({ token: `Bearer ${token}` });
          }
        );
      } else {
        return res.status(400).json(badRequest("The password is incorrect."));
      }
    } catch (error) {
      Logger.error(error);
    }
  }

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
          return res
            .status(500)
            .json(
              internal(
                "An error occured while saving the user to the database."
              )
            );
        }
      }
    } catch (error) {
      Logger.error(error);
    }
  }
}

export const userController = new UserController();
