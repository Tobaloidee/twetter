// Imports
import { badRequest, internal, notFound } from "boom";
import { Request, Response } from "express";

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

  public async delete(req: Request, res: Response) {
    try {
      const message = await Message.findById(req.params.message_id);

      if (message) {
        await message.remove();
        return res.status(200).json(message);
      } else {
        return res.status(404).json(notFound("Message not found."));
      }
    } catch (error) {
      Logger.error(error);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const message = await Message.findById(req.params.message_id);

      if (message) {
        return res.status(200).json(message);
      } else {
        return res.status(404).json(notFound("Message not found."));
      }
    } catch (error) {
      Logger.error(error);
    }
  }

  public async root(req: Request, res: Response) {
    try {
      const messages = await Message.find()
        .sort({ createdAt: "desc" })
        .populate("user", {
          profileImageUrl: true,
          username: true
        });

      return res.status(200).json(messages);
    } catch (error) {
      Logger.error(error);
    }
  }
}

export const messageController = new MessageController();
