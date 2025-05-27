import { Chat } from '../models/chat.model';

export class ChatRepository {
  async findAllByOwnerId(ownerId: string) {
    return await Chat.find({ owner: ownerId })
      .populate('responder')
      .populate('owner')
      .populate('lastMessage')
      .populate('messages');
  }

  async findById(id: string) {
    const chat = await Chat.findOne({ _id: id })
      .populate('responder')
      .populate('owner')
      .populate('lastMessage')
      .populate('messages');
    return chat;
  };

  async update(id: string, data: any) {
    return await Chat.findByIdAndUpdate(id, data);
  }

  async create(data: any) {
    return await Chat.create(data);
  }
}
