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

  lastMessage?: {
    _id: string;
    text: string;
    createdAt: string;
    senderModel: "User" | "Responder";
  };

  messages: {
    _id: string;
    text: string;
    createdAt: string;
    senderModel: "User" | "Responder";
  }[]
}