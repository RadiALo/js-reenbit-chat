export type MessageDto = {
  _id: string;
  text: string;
  createdAt: string;
  senderModel: "User" | "Responder";
}