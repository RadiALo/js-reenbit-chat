import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';

export class UserRouter {
  public router: Router;
  private controller = new UserController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.controller.getUsers.bind(this.controller));
    this.router.post('/', this.controller.registerUser.bind(this.controller));
  }
}
