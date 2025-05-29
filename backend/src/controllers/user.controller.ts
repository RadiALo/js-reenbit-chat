import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserLoginRequestDto, UserRegistrationRequestDto } from "../dtos/request/user.request.dto";
import { UserResponseDto } from "../dtos/response/user.response.dto";
import { validateOrReject } from "class-validator";

export class UserController {
  private userService = new UserService();

  async getUsers(_: Request, res: Response) {
    try {
      const users = await this.userService.getUsers();
      const userDtos = users.map(user => new UserResponseDto(user));
      res.status(200).json(userDtos);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
      console.error("Error fetching users:", error);
    }
  }

  async registerUser(
    req: Request<unknown, unknown, UserRegistrationRequestDto>,
    res: Response
  ) {
    try {
      const userDto = new UserRegistrationRequestDto(req.body);
      await validateOrReject(userDto)
        .catch(_ => {
          res.status(400).json({ message: "Email, password, and name are required" });
        });

      const user = await this.userService.registerUser(userDto.email, userDto.password, userDto.name);
      const token = await this.userService.loginUser(userDto.email, userDto.password);
      res.status(201).json({ user: new UserResponseDto(user), token });
    } catch (error: Error | any) {
      res.status(500).json({ message: "Error registering user", error });
      console.error("Error registering user:", error);
    }
  }

  async loginUser(
    req: Request<unknown, unknown, UserLoginRequestDto>,
    res: Response
  ) {
    try {
      const userDto = new UserLoginRequestDto(req.body);

      if (!userDto.email || !userDto.password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }

      const { token, userId, expireDate } = await this.userService.loginUser(userDto.email, userDto.password);

      res.status(200).json({ token, userId, expireDate });
    } catch (error: Error | any) {
      res.status(500).json({ message: "Error logging in user", error });
      console.error("Error logging in user:", error);
    }
  }

  async getCurrentUser(
    req: Request<{ id: string }>,
    res: Response
  ) {
    try {
      const userId = req.token?.userId;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const user = await this.userService.getUserById(userId);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(new UserResponseDto(user));
    } catch (error: Error | any) {
      res.status(500).json({ message: "Error fetching current user", error });
      console.error("Error fetching current user:", error);
    }
  }
}
