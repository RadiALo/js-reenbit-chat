import { Router } from "express";
import { ChatController } from "../controllers/chat.controller";

export class ChatRouter {
  public router: Router;
  private controller = new ChatController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/user/:id', this.controller.getChatsByUserId.bind(this.controller));
    this.router.get('/:id', this.controller.getChatById.bind(this.controller));
    this.router.post('/', this.controller.createChat.bind(this.controller));
    this.router.patch('/preffered', this.controller.updatePrefferedName.bind(this.controller));
    this.router.delete('/:id', this.controller.deleteChat.bind(this.controller));
  }
}
