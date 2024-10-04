import { verifyJwtToken } from "@/utils/tokenUtils";
import { RequestHandler } from "express";

export const isAuth: RequestHandler = (req, res, next): any => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = verifyJwtToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ message: error.message });
    }
    return res.status(401).json({ message: "Unauthorized" });
  }
};
