import { AuthController } from "@/controller/AuthController";
import { validator } from "@/middleware/validator";
import { UserRepository } from "@/repositoroy/UserRepository";
import { AuthService } from "@/service/AuthService";
import { createUserSchema, loginUserSchema } from "@/utils/validationSchema";
import { Router } from "express";

const router = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post("/login", validator(loginUserSchema), (req, res) =>
  authController.login(req, res)
);
router.post("/register", validator(createUserSchema), (req, res) =>
  authController.register(req, res)
);

export default router;
