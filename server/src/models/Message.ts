// Imports
import mongoose, { Document, Schema } from "mongoose";

// User Model
import User, { IUser } from "./User";

// Define Message Interface
export interface IMessage extends Document {
  text: string;
  user: IUser["_id"];
}

// Define Message Schema
const MessageSchema: Schema<IMessage> = new mongoose.Schema(
  {
    text: {
      maxlength: 160,
      required: true,
      type: String
    },
    user: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId
    }
  },
  { timestamps: true }
);

MessageSchema.pre<IMessage>("remove", async function(next) {
  try {
    const user = await User.findById(this.user);

    if (user) {
      user.messages.remove(this.id);
      await user.save();
    }

    return next();
  } catch (error) {
    next(error);
  }
});

// Export the Message Schema
export default mongoose.model("Message", MessageSchema);
