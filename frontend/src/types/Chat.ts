export type Chat = {
  user: {
    _id: string;
    name: string;
  }

  responder: {
    _id: string;
    name: string;
  }

  lastMessage?: {
    text: string;
    date: string;
  };
}