import { MessageRepository } from "../repositories/message.repository";
import { ChatRepository } from "../repositories/chat.repository";

export class MessageService {
  private messageRepository = new MessageRepository();
  private chatRepository = new ChatRepository();

  async sendUserMessage(chatId: string, userId: string, text: string) {
    const chat = await this.chatRepository.findById(chatId);

    if (!chat) {
      throw new Error('Chat not found');
    }

    const message = await this.messageRepository.create({
      chat: chatId,
      sender: userId,
      senderModel: "User",
      text,
    });

    chat.lastMessage = message._id;
    await this.chatRepository.update(chatId, chat);

    return message;
  }

  async sendResponderMessage(chatId: string, responderId: string, text: string) {
    const chat = await this.chatRepository.findById(chatId);
    
    if (!chat) {
      throw new Error('Chat not found');
    }

    const message = await this.messageRepository.create({
      chat: chatId,
      sender: responderId,
      senderModel: "Responder",
      text,
    });

    chat.lastMessage = message._id;
    await this.chatRepository.update(chatId, chat);

    return message;
  }
}