import { ChatRepository } from "../repositories/chat.repository";

export class ChatService {
  private chatRepository = new ChatRepository();

  async getChatsByUserId(userId: string) {
    return await this.chatRepository.findAllByUserId(userId);
  }

  async getChatById(chatId: string) {
    return await this.chatRepository.findById(chatId);
  }

  async createChat(data: any) {

    return await this.chatRepository.create({
      owner: data.ownerId,
      responder: data.responderId
    });
  }
}