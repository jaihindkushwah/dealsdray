import { Document, model, Schema } from "mongoose";

export interface IUserDocument extends Document {
  name: string;
  username: string;
  password: string;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model<IUserDocument>("User", UserSchema);
export default User;
