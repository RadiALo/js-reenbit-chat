export class ResponderResponseDto {
  _id: string;
  name: string;

  constructor(data: any) {
    this._id = data._id;
    this.name = data.name;
  }
}
