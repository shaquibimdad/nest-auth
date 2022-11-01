import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
