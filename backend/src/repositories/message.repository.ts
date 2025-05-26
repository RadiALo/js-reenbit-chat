import { Message } from "../models/message.model";

export class MessageRepository {
  async create(data: any) {
    return await Message.create(data);
  }
}