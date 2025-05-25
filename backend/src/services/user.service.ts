import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRATION = "14d";
const JWT_EXPIRATION_MS = 14 * 24 * 60 * 60 * 1000;

export class UserService {
  private userRepository = new UserRepository();

  async getUsers() {
    return await this.userRepository.findAll();
  }

  async getUserById(userId: string) {
    return await this.userRepository.findById(userId);
  }

  async registerUser(email: string, password: string, name: string) {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword
    };

    return await this.userRepository.create(userData);
  }

  async loginUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    return { token, userId: user._id, expireDate: new Date(Date.now() + JWT_EXPIRATION_MS) };
  }
}
