import mongoose from "mongoose";

export const dbConnect = () => {
  //   console.log(process.env.MONGO_URI);
  mongoose
    .connect(process.env.MONGO_URI!, {})
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
