import { IEmployeeImageRepository } from "@/interface/IEmployeeImageRepository";
import { IEmployeeRepository } from "@/interface/IEmployeeRepository";
import { IEmployeeService } from "@/interface/IEmployeeService";
import { createEmployeeSchema } from "@/utils/validationSchema";
import { Request } from "express";
import formidable from "formidable";
import fs from "fs";

export class EmployeeService implements IEmployeeService {
  private employeeRepository: IEmployeeRepository;
  private employeeImageRepository: IEmployeeImageRepository;

  constructor(
    employeeRepository: IEmployeeRepository,
    employeeImageRepository: IEmployeeImageRepository
  ) {
    this.employeeRepository = employeeRepository;
    this.employeeImageRepository = employeeImageRepository;
  }

  async createEmployee(req: Request): Promise<any> {
    try {
      const { fields, file } = await this.employeeFormValidation(req, true);

      const data = await fs.readFileSync(file.filepath);
      let image = Buffer.from(data).toString("base64");
      image = "data:" + file.mimetype + ";base64," + image;
      const newImage = await this.employeeImageRepository.create(
        file.originalFilename,
        file.mimetype,
        image
      );

      await this.employeeImageRepository.save(newImage);

      const employee = await this.employeeRepository.create({
        ...fields,
        imageId: newImage._id,
      });

      await this.employeeRepository.save(employee);
      return employee;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  }

  async updateEmployee(req: Request): Promise<any> {
    try {
      const { fields, file } = await this.employeeFormValidation(req);

      const data = await fs.readFileSync(file.filepath);
      let image = Buffer.from(data).toString("base64");
      image = "data:" + file.mimetype + ";base64," + image;
      const newImage = await this.employeeImageRepository.create(
        file.originalFilename,
        file.mimetype,
        image
      );

      await this.employeeImageRepository.save(newImage);
      const id = req.params.id;
      return await this.employeeRepository.findByIdAndUpdate(id, {
        ...fields,
        imageId: newImage._id,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  }

  async getEmployeeById(id: string): Promise<any> {
    try {
      const data = await this.employeeRepository.getById(id + "");
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Employee not found");
        // throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  }

  async getEmployees(): Promise<any> {
    // const pipeline = [
    //   {
    //     $match: {
    //       deleted: false,
    //     },
    //   },
    const data = await this.employeeRepository.getAll();
    // console.log(data);
    return data;
    // ];
  }

  async deleteEmployee(id: string): Promise<any> {
    return await this.employeeRepository.delete(id);
  }
  async getEmployeeImage(req: Request) {
    const imageData = await this.employeeImageRepository.getImageById(
      req.params.id
    );
    let width = parseInt(req.query.width as string) || 200;
    let height = parseInt(req.query.height as string) || 200;
    if (!width) {
      height = width;
    }
    if (!height) {
      width = height;
    }

    if (!imageData) {
      throw new Error("Image not found");
    }
    const { data, name } = imageData;
    const ele = `<img style="width: ${width}px; height: ${height}px;" src="${data}" alt=${name} />`;
    return ele;
  }
  private async employeeFormValidation(
    req: Request,
    isNew = false
  ): Promise<{ file: any; fields: any }> {
    const form = formidable({ multiples: false });
    // console.log(req.headers);

    if (!req.headers["content-type"]?.includes("multipart/form-data")) {
      throw new Error("Invalid request");
    }
    try {
      let [fields, files] = await form.parse(req);
      const newFields: any = new Object();
      Object.keys(fields).map((key) => {
        newFields[key] = fields?.[key]?.[0] ? fields[key][0] : "";
        // console.log(fields?.[key]);
      });
      await createEmployeeSchema.validate(newFields);
      if (
        files?.file?.[0].mimetype != "image/jpeg" &&
        files?.file?.[0].mimetype != "image/png"
      ) {
        throw new Error("File type must be jpg or png");
      }
      if (isNew) {
        const data = await this.employeeRepository.getByEmail(newFields.email);
        if (data) {
          throw new Error("Email already exists");
        }
      }
      return { file: files.file[0], fields: newFields };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  }
}
