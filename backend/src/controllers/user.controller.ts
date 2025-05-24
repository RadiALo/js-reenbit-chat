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
      const user = await this.userService.registerUser(req.body);
      res.status(201).json(user);
    } catch (error: Error | any) {
      res.status(400).json({ message: "Error registering user", error });
      console.error("Error registering user:", error);
    }
  }
}
