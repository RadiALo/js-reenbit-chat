import { Router } from "express";
import { ChatController } from "../controllers/chat.controller";
import authMiddleware from "../middleware/authMiddleware";

export class ChatRouter {
  public router: Router;
  private controller = new ChatController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/user/:id', authMiddleware, this.controller.getChatsByUserId.bind(this.controller));
    this.router.get('/:id', authMiddleware, this.controller.getChatById.bind(this.controller));
    this.router.post('/', authMiddleware, this.controller.createChat.bind(this.controller));
    this.router.patch('/preffered', authMiddleware, this.controller.updatePrefferedName.bind(this.controller));
    this.router.delete('/:id', authMiddleware, this.controller.deleteChat.bind(this.controller));
  }
}
