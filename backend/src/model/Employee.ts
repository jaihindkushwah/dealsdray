// f_Id,f_Image,f_Name,f_Email,f_Mobile,f_Designation,  f_gender,f_Course,f_Createdate

import mongoose, { ObjectId, Schema } from "mongoose";
import { Document, model } from "mongoose";

export interface IEmployeeDocument extends Document {
  name: string;
  email: string;
  mobile: string;
  designation: string;
  gender: string;
  course: string;
  createDate: Date;
  createdBy: ObjectId;
  imageId: ObjectId;
  // imageUrl: string;
  uuid: number;
}
const EmployeeSchema = new Schema<IEmployeeDocument>(
  {
    uuid: { type: Number, required: true, default: 1 },
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    mobile: { type: String, required: true, trim: true, lowercase: true },
    designation: { type: String, required: true, trim: true },
    gender: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    imageId: { type: Schema.Types.ObjectId, ref: "EmployeeImage" },
    // imageUrl: { type: String },
    createDate: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

EmployeeSchema.pre("save", async function (next) {
  var docs = this;
  const res = await model("Employee", EmployeeSchema).findOne({ _id: this.id });
  if (!res) {
    await model("Employee", EmployeeSchema)
      .find()
      .sort({ $natural: -1 })
      .limit(1)
      .exec()
      .then((result) => {
        docs.uuid = result[0] ? result[0].uuid + 1 : 1;
        next();
      });
  }
  next();
});

const Employee = model<IEmployeeDocument>("Employee", EmployeeSchema);
export default Employee;
