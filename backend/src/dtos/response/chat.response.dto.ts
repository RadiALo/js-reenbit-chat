export class ChatResponseDto {
  id: string;
  ownerId: string;
  responderId: string;
  
  lastMessage: {
    id: string;
    text: string;
    senderId: string;
    senderModel: string;
    createdAt: Date;
  }

  constructor(data: any) {
    this.id = data._id;
    this.ownerId = data.ownerId;
    this.responderId = data.responderId;
    this.lastMessage = data.lastMessage;
  }
}
