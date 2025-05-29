import { Chat } from '../models/chat.model';

export class ChatRepository {
  async findAllByOwnerId(ownerId: string) {
    return await Chat.find({ owner: ownerId })
      .populate(['responder', 'owner', 'lastMessage', 'messages']);
  }

  async findById(id: string) {
    return await Chat.findOne({ _id: id })
      .populate(['responder', 'owner', 'lastMessage', 'messages']);
  };

  async update(id: string, data: any) {
    return await Chat.findByIdAndUpdate(id, data);
  }

  async create(data: any) {
    const chat = await Chat.create(data);

    return chat.populate(['responder', 'owner']);
  }
}
