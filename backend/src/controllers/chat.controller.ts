import { ChatService } from "../services/chat.service";

export class ChatController {
  private chatService = new ChatService();

  async getChatsByUserId(req: any, res: any) {
    try {
      const userId = req.params.userId;
      const chats = await this.chatService.getChatsByUserId(userId);

      if (!chats) {
        return res.status(404).json({ message: "No chats found for this user" });
      }

      res.status(200).json(chats);
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

      res.status(200).json(chat);
    } catch (error: Error | any) {
      res.status(500).json({ message: "Error fetching chat", error });
      console.error("Error fetching chat:", error);
    }
  }

  async createChat(req: any, res: any) {
    try {
      const chatData = req.body;
      const newChat = await this.chatService.createChat(chatData);

      res.status(201).json(newChat);
    } catch (error: Error | any) {
      res.status(500).json({ message: "Error creating chat", error });
      console.error("Error creating chat:", error);
    }
  }
}