import { IEmployeeService } from "@/interface/IEmployeeService";
import { Request, Response } from "express";

export class EmployeeController {
  private employeeService: IEmployeeService;
  constructor(employeeService: IEmployeeService) {
    this.employeeService = employeeService;
  }

  async createEmployee(req: Request, res: Response) {
    try {
      // console.log("hha", req);
      const data = await this.employeeService.createEmployee(req);
      return res
        .status(201)
        .json({ message: "Employee created successfully", data: data });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async updateEmployee(req: Request, res: Response) {
    try {
      // console.log("hha", req);
      const data = await this.employeeService.updateEmployee(req);
      return res
        .status(201)
        .json({ message: "Employee created successfully", data: data });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      // Return the created employee data with a 201 status code.
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getEmployees(req: Request, res: Response) {
    // Handle any error that occurs.
    try {
      // Return the error message with a 500 status code.
      const data = await this.employeeService.getEmployees();
      return res.status(200).json({ data: data });
    } catch (error) {
      // If the error is not an instance of Error, return a generic error message.
      if (error instanceof Error) {
        return res.status(500).send(error.message);
      }
      return res.status(500).send("Something went wrong");
    }
  }
  async deleteEmployee(req: Request, res: Response) {
    try {
      const data = await this.employeeService.deleteEmployee(req.params.id);
      return res
        .status(201)
        .json({ message: "Employee deleted successfully", data: data });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getEmployee(req: Request, res: Response) {
    try {
      const data = await this.employeeService.getEmployeeById(req.params.id);
      return res.status(201).json({ data: data });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getEmployeeImage(req: Request, res: Response) {
    try {
      const data = await this.employeeService.getEmployeeImage(req);
      res.setHeader("Content-Type", "text/html");

      return res.status(200).send(data);
      // return res.status(201).send(data);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}
