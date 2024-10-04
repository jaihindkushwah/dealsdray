import { IUserRepository } from "@/interface/IUserRepository";
import User, { IUserDocument } from "@/model/User";

export class UserRepository implements IUserRepository {
  public async getUserById(id: string) {
    const user = await User.findById(id);
    return user;
  }
  public async getUserByUsername(username: string) {
    const user = await User.findOne({ username });
    return user;
  }
  public async createUser(name: string, username: string, password: string) {
    const user = new User({ name, username, password });
    return user;
  }
  public async save(user: IUserDocument): Promise<IUserDocument> {
    return await user.save();
  }
}
