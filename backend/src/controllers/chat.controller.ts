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
      const userId = req.token?.userId;
      const ownerId = req.params.id;

      if (userId !== ownerId) {
        res.status(403).json({ message: "Unauthorized" })
        return;
      }

      const chats = await this.chatService.getChatsByOwnerId(ownerId);

      if (!chats) {
        res.status(404).json({ message: "No chats found for this user" });
        return;
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
      const userId = req.token?.userId;
      const chatId = req.params.id;
      const chat = await this.chatService.getChatById(chatId);

      if (userId !== chat?.owner._id.toString()) {
        res.status(403).json({ message: "Unauthorized" })
        return;
      }

      if (!chat) {
        res.status(404).json({ message: "Chat not found" });
        return;
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
      const userId = req.token?.userId;
      const chatDto = new ChatRequestDto(req.body);

      if (userId !== chatDto.ownerId) {
        res.status(403).json({ message: "Unauthorized" })
        return;
      }

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
      const userId = req.token?.userId;
      const { chatId, prefferedName } = req.body;

      if (!chatId || !prefferedName) {
        res.status(400).json({ message: 'chatId and prefferedName is required.' });
        return;
      }

      const chat = await this.chatService.getChatById(chatId);

      if (!chat) {
        res.status(404).json({ message: 'Chat not found' })
        return;
      }

      if (userId !== chat.owner._id.toString()) {
        res.status(403).json({ message: "Unauthorized" })
        return;
      }

      const newChat = await this.chatService.updatePrefferedName(chatId, prefferedName);

      if (!newChat) {
        res.status(404).json({ message: 'Chat not found' })
        return;
      }

      res.status(200).json(new ChatResponseDto(newChat));
    } catch (error: Error | any) {
      res.status(500).json({ message: 'Server internall error' });
      console.error('Error updaitng preffered name:', error);
    }
  }

  async deleteChat(req: Request<{ id: string }>, res: Response) {
    try {
      const userId = req.token?.userId;
      const chatId = req.params.id;

      if (!chatId) {
        res.status(400).json({ message: 'chatId is required' })
      }

      const chat = await this.chatService.getChatById(chatId);

      if (!chat) {
        res.status(404).json({ message: 'Chat not found' })
        return;
      }

      if (userId !== chat.owner._id.toString()) {
        res.status(403).json({ message: "Unauthorized" })
        return;
      }

      this.chatService.deleteChat(chatId);
      res.status(200).json({ message: 'Success' })
    } catch (error: Error | any) {
      res.status(500).json({ message: 'Server internall error' });
      console.error('Error deleting chat:', error);
    }
  }
}