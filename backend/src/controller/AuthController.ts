import { CreateUser, LoginUser } from "@/@types/User";
import { IAuthService } from "@/interface/IAuthService";
import { Request, Response } from "express";

export class AuthController {
  private authService: IAuthService;
  constructor(authService: IAuthService) {
    this.authService = authService;
  }
  public async login(req: LoginUser, res: Response): Promise<any> {
    const { username, password } = req.body;
    try {
      const result = await this.authService.login(username, password);
      res.status(200).json({
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(500).send("Something went wrong");
    }
  }
  public async register(req: CreateUser, res: Response): Promise<any> {
    try {
      const { name, username, password } = req.body;
      // console.log(name, username, password);
      const result = await this.authService.register(name, username, password);
      return res.status(201).json({
        message: "Registration successful",
        data: result,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}
