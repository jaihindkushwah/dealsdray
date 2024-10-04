import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IEmployeeImageDocument extends Document {
  name: string;
  contentType: string;
  data: String;
}

const ImageSchema = new mongoose.Schema<IEmployeeImageDocument>({
  name: { type: String, required: true },
  contentType: { type: String, required: true },
  data: { type: String, required: true },
});

const EmployeeImage = mongoose.model<IEmployeeImageDocument>(
  "EmployeeImage",
  ImageSchema
);
export default EmployeeImage;
