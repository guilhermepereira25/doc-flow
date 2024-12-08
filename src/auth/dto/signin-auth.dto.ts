import { IsNotEmpty, IsString } from 'class-validator';

export class SignInAuthDto {
  @IsString()
  username: string;
  @IsNotEmpty()
  password: string;
}
