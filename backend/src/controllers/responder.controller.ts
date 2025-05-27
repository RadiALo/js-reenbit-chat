import { ResponderService } from "../services/responder.service";
import { ResponderResponseDto } from "../dtos/response/responder.response.dto";
import { ResponderFetchDto } from "../dtos/fetch/responder.fetch.dto";

export class ResponderController {
  private responderService = new ResponderService();

  async getResponders(_: any, res: any) {
    try {
      const responders = await this.responderService.getResponders();
      const respondersDtos = responders.map(responder => new ResponderResponseDto(responder));

      res.status(200).json(respondersDtos);
    } catch (error: Error | any) {
      res.status(500).json({ message: "Error fetching responders", error });
      console.error("Error fetching responders:", error);
    }
  }

  async getResponderById(req: any, res: any) {
    try {
      const responderId = req.params.id;
      const responder = await this.responderService.getResponderById(responderId);

      if (!responder) {
        return res.status(404).json({ message: "Responder not found" });
      }

      res.status(200).json(new ResponderResponseDto(responder));
    } catch (error: Error | any) {
      res.status(500).json({ message: "Error fetching responder", error });
      console.error("Error fetching responder:", error);
    }
  }

  async fetchResponders() {
    try {
      const response = await fetch("https://api.quotable.io/authors");

      if (!response.ok) {
        throw new Error("Failed to fetch responders from external API");
      }

      const data = await response.json();

      for (let i = 1; i < data.totalPages; i++) {
        const pageResponse = await fetch(`https://api.quotable.io/authors?page=${i + 1}`);

        if (!pageResponse.ok) {
          throw new Error(`Failed to fetch page ${i + 1} from external API`);
        }

        const pageData = await pageResponse.json();
        data.results.push(...pageData.results);
      }

      const responders = data.results.map((responder: any) => ({
        name: responder.name,
        apiId: responder._id,
      }))

      const storedResponders = await this.responderService.getResponders();
      const storedResponderDtos = storedResponders.map((responder: any) => new ResponderFetchDto(responder));

      const storedApiIds = storedResponderDtos.map((responder: any) => responder.apiId);

      const newResponders = responders.filter((responder: any) => !storedApiIds.includes(responder.apiId));

      if (newResponders.length > 0) {
        await Promise.all(newResponders.map((responder: any) => 
          this.responderService.createResponder(responder.apiId, responder.name)
        ));
      }
    } catch (error: Error | any) {
      console.error("Error fetching responders:", error);
      throw new Error("Failed to fetch responders from external API");
    }
  }
}
