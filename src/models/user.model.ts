import { Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new Schema<UserType>(
  {
    uid: {
      type: String,
      default: () => uuidv4(),
    },
    firstName: {
      type: String,
      required: true,
      min: 3,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 16,
    },
  },
  { timestamps: true }
);

export const User = models.User || model("User", userSchema);
