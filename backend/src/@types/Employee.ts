import { Request } from "express";

export interface ICreateEmployee extends Request {
  body: {
    name: string;
    email: string;
    mobile: string;
    designation: string;
    gender: string;
    course: string;
  };
}
