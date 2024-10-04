import jwt from "jsonwebtoken";
export const createJwtToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "", { expiresIn: "1d" });
};
export const verifyJwtToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET || "");
};
