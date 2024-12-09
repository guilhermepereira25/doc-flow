import { IsNotEmpty, IsString } from 'class-validator';

export class SignInAuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
