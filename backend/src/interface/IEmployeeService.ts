import { IEmployeeDocument } from "@/model/Employee";
import { IEmployeeImageDocument } from "@/model/Image";
import { Request } from "express";

export interface IEmployeeService {
  createEmployee(data: Request): Promise<IEmployeeDocument>;
  updateEmployee(data: Request): Promise<IEmployeeDocument>;
  getEmployeeById(id: string): Promise<IEmployeeDocument | null>;
  getEmployees(): Promise<IEmployeeDocument[] | null>;
  deleteEmployee(id: string): Promise<any>;
  getEmployeeImage(req: Request): Promise<String | null>;
}
