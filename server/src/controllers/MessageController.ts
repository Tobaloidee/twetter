// Imports
import { Request, Response } from "express";
import { badRequest, notFound } from "boom";

// Models
import Message from "../models/Message";
import User from "../models/User";

// Validation
import validateMessageInput from "../validation/message";

// Utils
import Logger from "../utils/logger";

export class MessageController {
  public async create(req: Request, res: Response) {
    try {
      const { errors, isValid } = validateMessageInput(req.body);

      if (!isValid) {
        return res.status(400).json(badRequest("Bad Request", errors));
      }

      const message = await Message.create({
        text: req.body.text,
        user: req.params.id
      });

      const foundUser = await User.findById(req.params.id);

      if (foundUser) {
        foundUser.messages.push(message.id);
        await foundUser.save();
      } else {
        return res.status(404).json(notFound("User not found."));
      }

      const foundMessage = await Message.findById(message._id).populate(
        "user",
        { profileImageUrl: true, username: true }
      );

      if (foundMessage) {
        return res.status(200).json(foundMessage);
      } else {
        return res.status(404).json(notFound("Message not found."));
      }
    } catch (error) {
      Logger.error(error);
    }
  }
}

export const messageController = new MessageController();
