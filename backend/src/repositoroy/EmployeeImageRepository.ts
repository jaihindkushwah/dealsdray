import { IEmployeeImageRepository } from "@/interface/IEmployeeImageRepository";
import EmployeeImage, { IEmployeeImageDocument } from "@/model/Image";

export class EmployeeImageRepository implements IEmployeeImageRepository {
  async getImageById(id: string) {
    return await EmployeeImage.findById(id);
  }
  async create(name: string, contentType: string, data: String) {
    return new EmployeeImage({ name, contentType, data });
  }
  async save(user: IEmployeeImageDocument) {
    return await user.save();
  }
}
