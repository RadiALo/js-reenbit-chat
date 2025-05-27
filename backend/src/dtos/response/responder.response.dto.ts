export class ResponderResponseDto {
  id: string;
  name: string;

  constructor(data: any) {
    this.id = data._id;
    this.name = data.name;
  }
}
