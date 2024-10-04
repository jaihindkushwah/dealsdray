import { IEmployeeDocument } from "@/model/Employee";

export interface IEmployeeRepository {
  getAll(query?: any): Promise<IEmployeeDocument[] | null>;
  getById(id: string): Promise<IEmployeeDocument | null>;
  getByEmail(id: string): Promise<IEmployeeDocument | null>;
  create(user: any): Promise<IEmployeeDocument>;
  findByIdAndUpdate(
    id: string,
    user: IEmployeeDocument
  ): Promise<IEmployeeDocument | null>;
  delete(id: string): Promise<any>;
  save(user: IEmployeeDocument): Promise<IEmployeeDocument | null>;
}
