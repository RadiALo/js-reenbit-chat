export class UserResponseDto {
  id: string;
  email: string;
  name: string;
  createdAt: Date;

  constructor(data: any) {
    this.id = data._id;
    this.email = data.email;
    this.name = data.name;
    this.createdAt = data.createdAt;
  }
}
