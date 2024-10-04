export interface IAuthService {
  login(username: string, password: string): Promise<any>;
  register(name: string, username: string, password: string): Promise<any>;
}
