import { Router } from "express";
import { MessageController } from "../controllers/message.controller";
import { SocketService } from "../services/socket.service";
import authMiddleware from "../middleware/authMiddleware";

export class MessageRouter {
  public router: Router;
  private controller;

  constructor(socketService: SocketService) {
    this.controller = new MessageController(socketService);
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/send', authMiddleware, this.controller.sendUserMessage.bind(this.controller));
  }
}