import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserRegistrationRequestDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  name: string;

  constructor(data: any) {
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
  }
}

export class UserLoginRequestDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  constructor(data: any) {
    this.email = data.email;
    this.password = data.password;
  }
}
