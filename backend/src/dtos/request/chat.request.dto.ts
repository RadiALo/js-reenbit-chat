export class ChatRequestDto {
  ownerId: string;
  responderId: string;
  prefferedName: string;

  constructor(data: any) {
    this.ownerId = data.ownerId;
    this.responderId = data.responderId;
    this.prefferedName = data.prefferedName || '';
  }
}