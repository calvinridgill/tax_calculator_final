import mongoose, { Schema, Types } from "mongoose";

interface IUser {
  _id: Types.ObjectId;
  firstName: string;
  lastName?: string;
  email: string;
  password?: string;
  phone?: string;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, trim: true, minlength: 6 },
    phone: String,
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
