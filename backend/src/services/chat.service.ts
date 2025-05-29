import { ChatRepository } from "../repositories/chat.repository";

export class ChatService {
  private chatRepository = new ChatRepository();

  async getChatsByOwnerId(ownerId: string) {
    return await this.chatRepository.findAllByOwnerId(ownerId);
  }

  async getChatById(chatId: string) {
    return await this.chatRepository.findById(chatId);
  }

  async createChat(data: any) {
    return await this.chatRepository.create({
      owner: data.ownerId,
      responder: data.responderId,
      prefferedName: data.prefferedName
    });
  }
}