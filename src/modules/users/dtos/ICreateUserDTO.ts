import { IsEmail, IsString } from 'class-validator';

export class ICreateUserDTO {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
