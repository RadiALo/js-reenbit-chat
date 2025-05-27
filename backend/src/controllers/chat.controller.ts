import { ChatService } from "../services/chat.service";
import { ChatResponseDto } from "../dtos/response/chat.response.dto";
import { ChatRequestDto } from "../dtos/request/chat.request.dto";
import { IChat } from "../models/chat.model";

export class ChatController {
  private chatService = new ChatService();

  async getChatsByUserId(req: any, res: any) {
    try {
      const userId = req.params.userId;
      const chats = await this.chatService.getChatsByUserId(userId);

      if (!chats) {
        return res.status(404).json({ message: "No chats found for this user" });
      }

      const chatDtos = chats.map((chat: any) => new ChatResponseDto(chat));

      res.status(200).json(chatDtos);
    } catch (error: Error | any) {
      res.status(500).json({ message: "Error fetching chats", error });
      console.error("Error fetching chats:", error);
    }
  }

  async getChatById(req: any, res: any) {
    try {
      const chatId = req.params.id;
      const chat = await this.chatService.getChatById(chatId);

      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }

      res.status(200).json(new ChatResponseDto(chat));
    } catch (error: Error | any) {
      res.status(500).json({ message: "Error fetching chat", error });
      console.error("Error fetching chat:", error);
    }
  }

  async createChat(req: any, res: any) {
    try {
      const chatDto = new ChatRequestDto(req.body);
      const newChat = await this.chatService.createChat(chatDto);

      res.status(201).json(newChat);
    } catch (error: Error | any) {
      res.status(500).json({ message: "Error creating chat", error });
      console.error("Error creating chat:", error);
    }
  }
}