import { MessageRequestDto } from "../dtos/request/message.request.dto";
import { MessageService } from "../services/message.service";
import { ChatService } from "../services/chat.service";
import { IResponder } from "../models/responder.model";
import { IChat } from "../models/chat.model";

export class MessageController {
  private messageService = new MessageService();
  private chatService = new ChatService();

  async sendUserMessage(req: any, res: any) {
    try {
      const dto = new MessageRequestDto(req.body);
      const message = await this.messageService.sendUserMessage(dto.chatId, dto.userId, dto.text);

      setTimeout(async () => {
        const chat = await this.chatService.getChatById(dto.chatId) as IChat;
        console.log("Chat retrieved:", chat);
        if (!chat) {
          console.error("Chat not found");
          return;
        }
        
        const responder = chat.responder as IResponder
        const responderId = responder._id.toString();
        const responderMessage = await this.getRandomQuote(responder.name);
        console.log("Responder message:", responderMessage);
        this.messageService.sendResponderMessage(dto.chatId, responderId, responderMessage)
      }, 3000);

      res.status(201).json(message);
    } catch (error: Error | any) {
      res.status(500).json({ message: "Error sending user message", error });
      console.error("Error sending user message:", error);
    }
  }

  private async getRandomQuote(responderName: string): Promise<string> {
    console.log("Fetching quote for responder:", responderName);
    const url = `https://api.quotable.io/random?author=${encodeURIComponent(responderName)}`;

    const quote: Promise<string> = fetch(url).then(async (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.content;
    });

    return quote;
  }
}