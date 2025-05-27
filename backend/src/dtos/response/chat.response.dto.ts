export class ChatResponseDto {
  id: string;
  ownerId: string;
  responderId: string;
  lastMessage: string;
  messages: string[];

  constructor(data: any) {
    this.id = data._id;
    this.ownerId = data.owner;
    this.responderId = data.responder;
    this.lastMessage = data.lastMessage;
    this.messages = data.messages;
  }
}
