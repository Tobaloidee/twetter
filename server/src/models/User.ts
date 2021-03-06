// Imports
import mongoose, { Document, Schema } from "mongoose";

// Message Model Interface
import { IMessage } from "./Message";

// Define User Interface
export interface IUser extends Document {
  email: string;
  messages: IMessage["_id"];
  password: string;
  profileImageURL: string;
  username: string;
}

// Define UserSchema
const UserSchema: Schema<IUser> = new mongoose.Schema({
  email: {
    lowercase: true,
    required: true,
    type: String,
    unique: true
  },
  messages: [
    {
      ref: "Message",
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  password: {
    max: 100,
    min: 8,
    required: true,
    type: String
  },
  profileImageURL: {
    type: String
  },
  username: {
    max: 50,
    required: true,
    type: String,
    unique: true
  }
});

// Export the UserSchema
export default mongoose.model<IUser>("User", UserSchema);
