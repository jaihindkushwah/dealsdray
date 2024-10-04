import { IAuthService } from "@/interface/IAuthService";
import { IUserRepository } from "@/interface/IUserRepository";
import { comparePassword, encryptPassword } from "@/utils/encryptDecrypt";
import { createJwtToken } from "@/utils/tokenUtils";

export class AuthService implements IAuthService {
  private userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  public async login(username: string, password: string): Promise<any> {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      throw new Error("User not found");
    }
    const isValid = comparePassword(password, user.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }
    const token = createJwtToken({
      name: user.name,
      username: user.username,
      id: user._id,
    });
    return { token, name: user.name, username: user.username, id: user._id };
  }
  public async register(
    name: string,
    username: string,
    password: string
  ): Promise<any> {
    const user = await this.userRepository.getUserByUsername(username);
    if (user) {
      throw new Error("User already exists");
    }
    const newUser = await this.userRepository.createUser(
      name,
      username,
      encryptPassword(password)
    );
    await this.userRepository.save(newUser);
    const token = createJwtToken({
      name: newUser.name,
      username: newUser.username,
      id: newUser._id,
    });
    return {
      token,
      name: newUser.name,
      username: newUser.username,
      id: newUser._id,
    };
  }
}
