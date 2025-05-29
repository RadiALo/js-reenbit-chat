export type MessageDto = {
  _id: string;
  text: string;
  createdAt: Date;
  senderModel: "User" | "Responder";
}