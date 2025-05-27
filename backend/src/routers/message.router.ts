import { Router } from "express";
import { MessageController } from "../controllers/message.controller";

export class MessageRouter {
  public router: Router;
  private controller = new MessageController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/send', this.controller.sendUserMessage.bind(this.controller));
  }
}