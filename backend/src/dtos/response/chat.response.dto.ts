import { MessageResponseDto } from "./message.response.dto";
import { ResponderResponseDto } from "./responder.response.dto";
import { UserResponseDto } from "./user.response.dto";

export class ChatResponseDto {
  _id: string;
  owner: UserResponseDto;
  responder: ResponderResponseDto;
  prefferedName: string;
  lastMessage: MessageResponseDto | undefined;
  messages: MessageResponseDto[] | [];

  constructor(data: any) {
    this._id = data._id;
    this.owner = new UserResponseDto(data.owner);
    this.responder = new ResponderResponseDto(data.responder);
    this.prefferedName = data.prefferedName;
    this.lastMessage = data.lastMessage ? new MessageResponseDto(data.lastMessage) : undefined;
    this.messages = data.messages.map((message: any) => { return new MessageResponseDto(message) });
  }
}
