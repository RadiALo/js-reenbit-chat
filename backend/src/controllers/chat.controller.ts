import { Request, Response } from "express";
import { ChatService } from "../services/chat.service";
import { ChatResponseDto } from "../dtos/response/chat.response.dto";
import { ChatRequestDto } from "../dtos/request/chat.request.dto";

export class ChatController {
  private chatService = new ChatService();

  async getChatsByUserId(
    req: Request<{ id: string }>,
    res: Response
  ) {
    try {
      const ownerId = req.params.id;
      const chats = await this.chatService.getChatsByOwnerId(ownerId);

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

  async getChatById(
    req: Request<{ id: string }>,
    res: Response
  ) {
    try {
      const chatId = req.params.id;
      const chat = await this.chatService.getChatById(chatId);

      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
      console.log(chat)
      res.status(200).json(new ChatResponseDto(chat));
    } catch (error: Error | any) {
      res.status(500).json({ message: "Error fetching chat", error });
      console.error("Error fetching chat:", error);
    }
  }

  async createChat(
    req: Request<unknown, unknown,
      ChatRequestDto>, res: Response
  ) {
    try {
      const chatDto = new ChatRequestDto(req.body);
      const newChat = await this.chatService.createChat(chatDto);

      res.status(201).json(new ChatResponseDto(newChat));
    } catch (error: Error | any) {
      res.status(500).json({ message: "Error creating chat", error });
      console.error("Error creating chat:", error);
    }
  }

  async updatePrefferedName(
    req: Request<unknown, unknown, { chatId: string, prefferedName: string }>,
    res: Response
  ) {
    try {
      const { chatId, prefferedName } = req.body;

      if (!chatId || !prefferedName) {
        return res.status(400).json({ message: 'chatId and prefferedName is required.' });
      }

      const newChat = await this.chatService.updatePrefferedName(chatId, prefferedName);

      if (!newChat) {
        return res.status(404).json({ message: 'Chat not found' });
      }

      res.status(200).json(new ChatResponseDto(newChat));
    } catch (error: Error | any) {
      res.status(500).json({ message: 'Server internall error' });
      console.error('Error updaitng preffered name:', error);
    }
  }

  async deleteChat(req: Request<{ id: string }>, res: Response) {
    try {
      const chatId = req.params.id;

      if (!chatId) {
        res.status(400).json({ message: 'chatId is required' })
      }

      this.chatService.deleteChat(chatId);
      res.status(200).json({ message: 'Success' })
    } catch (error: Error | any) {
      res.status(500).json({ message: 'Server internall error' });
      console.error('Error deleting chat:', error);
    }
  }
}