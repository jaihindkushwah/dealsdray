import { EmployeeController } from "@/controller/EmployeeController";
import { isAuth } from "@/middleware/isAuth";
import { EmployeeImageRepository } from "@/repositoroy/EmployeeImageRepository";
import { EmployeeRepository } from "@/repositoroy/EmployeeRepository";
import { EmployeeService } from "@/service/EmployeeService";
import { Router } from "express";

const employeeRepository = new EmployeeRepository();
const employeeImageRepo = new EmployeeImageRepository();
const employeeService = new EmployeeService(
  employeeRepository,
  employeeImageRepo
);
const controller = new EmployeeController(employeeService);

const router = Router();

router.get("/get/:id", isAuth, (req, res) => {
  controller.getEmployee(req, res);
});
router.get("/image/:id", (req, res) => {
  controller.getEmployeeImage(req, res);
});
router.get("/getAll", isAuth, (req, res) => {
  controller.getEmployees(req, res);
});
router.post("/create", isAuth, (req, res) => {
  controller.createEmployee(req, res);
});
router.put("/update/:id", isAuth, (req, res) => {
  controller.updateEmployee(req, res);
});
router.delete("/delete/:id", isAuth, (req, res) => {
  controller.deleteEmployee(req, res);
});

export default router;
