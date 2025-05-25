import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService = new UserService();

  async getUsers(_: Request, res: Response) {
    try {
      const users = await this.userService.getUsers();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
      console.error("Error fetching users:", error);
    }
  }

  async registerUser(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        res.status(400).json({ message: "Email, password, and name are required" });
        return;
      }

      const user = await this.userService.registerUser(email, password, name);
      res.status(201).json(user);
    } catch (error: Error | any) {
      res.status(500).json({ message: "Error registering user", error });
      console.error("Error registering user:", error);
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }

      const { token, userId } = await this.userService.loginUser(email, password);
      
      res.status(200).json({ token, userId });
    } catch (error: Error | any) {
      res.status(500).json({ message: "Error logging in user", error });
      console.error("Error logging in user:", error);
    }
  }
}
