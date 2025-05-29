export class UserResponseDto {
  _id: string;
  email: string;
  name: string;
  token?: string;
  createdAt: Date;

  constructor(data: any) {
    this._id = data._id;
    this.email = data.email;
    this.name = data.name;
    this.createdAt = data.createdAt;
    this.token = data?.token;
  }
}
