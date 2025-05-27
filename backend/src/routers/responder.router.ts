import { Router } from "express";
import { ResponderController } from "../controllers/responder.controller";
import cron from "node-cron";

export class ResponderRouter {
  public router: Router;
  private controller = new ResponderController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.controller.getResponders.bind(this.controller));
    this.router.get("/:id", this.controller.getResponderById.bind(this.controller));
    
    this.controller.fetchResponders().catch((error: Error | any) => {
      console.error("Error fetching responders:", error);
    });

    cron.schedule("0 * * * *", async () => {
      this.controller.fetchResponders().catch((error: Error | any) => {
        console.error("Error fetching responders:", error);
      });
    });
  }
}