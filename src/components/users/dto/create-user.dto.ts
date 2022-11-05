import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;


  refreshToken?: string;
}
