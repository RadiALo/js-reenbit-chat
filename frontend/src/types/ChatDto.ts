import { MessageDto } from "./MessageDto";

export type ChatDto = {
  _id: string;

  owner: {
    _id: string;
    name: string;
  }

  responder: {
    _id: string;
    name: string;
  }

  prefferedName: string;
  lastMessage?: MessageDto;
  messages: MessageDto[]
}