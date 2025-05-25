import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';
import authMiddleware from '../middleware/authMiddleware';

export class UserRouter {
  public router: Router;
  private controller = new UserController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/register', this.controller.registerUser.bind(this.controller));
    this.router.post('/login', this.controller.loginUser.bind(this.controller));
    this.router.get('/me', authMiddleware, this.controller.getCurrentUser.bind(this.controller));
    this.router.get('/', this.controller.getUsers.bind(this.controller));
  }
}
