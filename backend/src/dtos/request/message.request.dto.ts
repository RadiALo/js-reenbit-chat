export class MessageRequestDto {
  chatId: string;
  userId: string;
  text: string;

  constructor(data: any) {
    this.chatId = data.chatId;
    this.userId = data.userId;
    this.text = data.text;
  }
}