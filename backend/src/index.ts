import Express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "@/router/Auth";
import employeeRouter from "@/router/Employee";
import { dbConnect } from "@/db/mongoDb";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = Express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dbConnect();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World", status: "alive" });
});

app.use("/auth", authRouter);
app.use("/employee", employeeRouter);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
