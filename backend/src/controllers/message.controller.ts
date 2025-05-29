import { Request, Response } from "express";
import { MessageRequestDto } from "../dtos/request/message.request.dto";
import { MessageService } from "../services/message.service";
import { ChatService } from "../services/chat.service";
import { IResponder } from "../models/responder.model";
import { IChat } from "../models/chat.model";
import { SocketService } from "../services/socket.service";
import { MessageResponseDto } from "../dtos/response/message.response.dto";
import { ChatResponseDto } from "../dtos/response/chat.response.dto";

export class MessageController {
  private messageService;
  private chatService = new ChatService();
  private socketService;

  constructor(socketService: SocketService) {
    this.messageService = new MessageService();
    this.socketService = socketService;
  }

  async sendUserMessage(
    req: Request<unknown, unknown, MessageRequestDto>,
    res: Response
  ) {
    try {
      const dto = new MessageRequestDto(req.body);
      const message = await this.messageService.sendUserMessage(dto.chatId, dto.userId, dto.text);

      setTimeout(async () => {
        const chat = await this.chatService.getChatById(dto.chatId) as IChat;

        if (!chat) {
          console.error("Chat not found");
          return;
        }

        const responder = chat.responder as IResponder
        const responderId = responder._id.toString();
        const responderMessage = await this.getRandomQuote(responder.name);

        if (!responderMessage) {
          return;
        }

        const message = await this.messageService.sendResponderMessage(dto.chatId, responderId, responderMessage)
        this.socketService.sendToUser(new MessageResponseDto(message), new ChatResponseDto(chat));
      }, 3000);

      res.status(201).json(message);
    } catch (error: Error | any) {
      res.status(500).json({ message: "Error sending user message", error });
      console.error("Error sending user message:", error);
    }
  }

  private async getRandomQuote(responderName: string): Promise<string> {
    const url = `https://api.quotable.io/random?author=${encodeURIComponent(responderName)}`;

    const quote: Promise<string> = fetch(url).then(async (response) => {
      if (!response.ok) {
        const data = await response.json();
        console.error(data.content);
        return null;
      }

      const data = await response.json();
      return data.content;
    });

    return quote;
  }
}