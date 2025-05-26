import { MessageRepository } from "../repositories/message.repository";

export class MessageService {
  private messageRepository = new MessageRepository();

  async sendUserMessage(chatId: string, userId: string, text: string) {
    return await this.messageRepository.create({
      chat: chatId,
      sender: userId,
      senderModel: "User",
      text,
    });
  }

  async sendResponderMessage(chatId: string, responderId: string, text: string) {
    return await this.messageRepository.create({
      chat: chatId,
      sender: responderId,
      senderModel: "Responder",
      text,
    });
  }
}