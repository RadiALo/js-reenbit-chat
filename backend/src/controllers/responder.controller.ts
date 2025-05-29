import { Request, Response } from "express";
import { ResponderService } from "../services/responder.service";
import { ResponderResponseDto } from "../dtos/response/responder.response.dto";
import { ResponderFetchDto } from "../dtos/fetch/responder.fetch.dto";

export class ResponderController {
  private responderService = new ResponderService();

  async getResponders(_: Request, res: Response) {
    try {
      const responders = await this.responderService.getResponders();
      const respondersDtos = responders.map(responder => new ResponderResponseDto(responder));

      res.status(200).json(respondersDtos);
    } catch (error: Error | any) {
      res.status(500).json({ message: "Error fetching responders", error });
      console.error("Error fetching responders:", error);
    }
  }

  async getResponderById(
    req: Request<{ id: string }>,
    res: Response
  ) {
    try {
      const responderId = req.params.id;
      const responder = await this.responderService.getResponderById(responderId);

      if (!responder) {
        res.status(404).json({ message: "Responder not found" })
        return;
      }

      res.status(200).json(new ResponderResponseDto(responder));
    } catch (error: Error | any) {
      res.status(500).json({ message: "Error fetching responder", error });
      console.error("Error fetching responder:", error);
    }
  }

  async fetchResponders() {
    try {
      const initialResponse = await fetch("https://api.quotable.io/authors");

      if (!initialResponse.ok) {
        throw new Error("Failed to fetch responders from external API");
      }

      const initialData = await initialResponse.json();
      let allResults = [...initialData.results];
      const totalPages = initialData.totalPages;

      for (let i = 1; i <= totalPages; i++) {
        const pageResponse = await fetch(`https://api.quotable.io/authors?page=${i}`);
        if (!pageResponse.ok) {
          throw new Error(`Failed to fetch page ${i} from external API`);
        }

        const pageData = await pageResponse.json();
        allResults.push(...pageData.results);
      }

      const responders = allResults.map((responder: any) => new ResponderFetchDto(responder));

      const storedResponders = await this.responderService.getResponders();
      const storedApiIds: string[] = storedResponders.map((r: any) => r.apiId);

      const newResponders = responders.filter(
        (responder) => responder.quoteCount > 5 && responder.apiId && !storedApiIds.includes(responder.apiId)
      );

      if (newResponders.length > 0) {
        await Promise.all(
          newResponders.map((responder) =>
            this.responderService.createResponder(responder.apiId, responder.name)
          )
        );
      }
    } catch (error: Error | any) {
      console.error("Error fetching responders:", error);
      throw new Error("Failed to fetch responders from external API");
    }
  }
}
