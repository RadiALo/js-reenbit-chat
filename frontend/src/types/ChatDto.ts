import { MessageDto } from "./MessageDto";

export type ChatDto = {
  id: string;

  owner: {
    _id: string;
    name: string;
  }

  responder: {
    _id: string;
    name: string;
  }

  lastMessage?: MessageDto;
  messages: MessageDto[]
}