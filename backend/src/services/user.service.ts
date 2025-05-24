import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private userRepository = new UserRepository();

  async getUsers() {
    return await this.userRepository.findAll();
  }

  async registerUser(data: any) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    return await this.userRepository.create(data);
  }
}
