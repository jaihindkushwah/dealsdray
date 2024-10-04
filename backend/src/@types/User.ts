import { Request } from "express";

export interface LoginUser extends Request {
  body: {
    username: string;
    password: string;
  };
}

export interface CreateUser extends Request {
  body: {
    name: string;
    username: string;
    password: string;
  };
}
