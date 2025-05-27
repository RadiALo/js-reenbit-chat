export class ChatResponseDto {
  id: string;
  owner: string;
  responder: string;
  lastMessage: string;
  messages: string[];

  constructor(data: any) {
    this.id = data._id;
    this.owner = data.owner;
    this.responder = data.responder;
    this.lastMessage = data.lastMessage;
    this.messages = data.messages;
  }
}
