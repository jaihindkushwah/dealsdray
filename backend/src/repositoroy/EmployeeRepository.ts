import { IEmployeeRepository } from "@/interface/IEmployeeRepository";
import Employee, { IEmployeeDocument } from "@/model/Employee";

export class EmployeeRepository implements IEmployeeRepository {
  async create(user: any) {
    const employee = new Employee(user);
    return employee;
  }
  async delete(id: string) {
    return Employee.findByIdAndDelete(id);
  }
  async getAll(query = {}) {
    const getAllData = await Employee.find(query);
    // console.log(getAllData);
    return getAllData;
  }
  async getById(id: string) {
    return await Employee.findOne({ _id: id });
  }
  async getByEmail(id: string) {
    return await Employee.findOne({ email: id });
  }
  async findByIdAndUpdate(id: string, user: IEmployeeDocument) {
    return await Employee.findByIdAndUpdate(id, user, { new: true });
  }
  async save(user: IEmployeeDocument) {
    return user.save();
  }
}
