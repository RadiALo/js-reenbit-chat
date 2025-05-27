export class ChatRequestDto {
  ownerId: string;
  responderId: string;

  constructor(data: any) {
    this.ownerId = data.ownerId;
    this.responderId = data.responderId;
  }
}