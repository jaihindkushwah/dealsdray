import { IEmployeeImageDocument } from "@/model/Image";

export interface IEmployeeImageRepository {
  getImageById(id: string): Promise<IEmployeeImageDocument | null>;
  create(
    name: string,
    contentType: string,
    data: String
  ): Promise<IEmployeeImageDocument>;
  save(user: IEmployeeImageDocument): Promise<IEmployeeImageDocument | null>;
}
