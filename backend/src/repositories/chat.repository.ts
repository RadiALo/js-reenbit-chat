import { Chat } from '../models/chat.model';

export class ChatRepository {
  async findAllByUserId(userId: string) {
    return await Chat.find({ owner: userId })
      .populate('responder')
      .populate('owner')
      .populate('lastMessage');
  }

  async findById(id: string) {
    return await Chat.findOne({ _id: id })
      .populate('responder')
      .populate('owner')
      .populate('messages');
  }

  async create(data: any) {
    return await Chat.create(data);
  }
}
