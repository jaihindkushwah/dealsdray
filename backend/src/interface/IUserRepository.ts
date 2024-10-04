import { IUserDocument } from "@/model/User";

export interface IUserRepository {
  getUserById(id: string): Promise<IUserDocument | null>;
  getUserByUsername(username: string): Promise<IUserDocument | null>;
  createUser(
    name: string,
    username: string,
    password: string
  ): Promise<IUserDocument>;
  save(user: IUserDocument): Promise<IUserDocument>;
}
