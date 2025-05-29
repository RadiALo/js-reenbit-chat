export class MessageResponseDto {
  _id: string;
  sender: string;
  senderModel: string;
  text: string;
  createdAt: Date

  constructor(data: any) {
    this._id = data._id;
    this.sender = data.sender;
    this.senderModel = data.senderModel;
    this.text = data.text;
    this.createdAt = data.createdAt;
  }
}
