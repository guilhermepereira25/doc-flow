import { IsString, IsStrongPassword } from 'class-validator';

export class SignUpAuthDto {
  @IsString()
  username: string;
  @IsStrongPassword()
  password: string;
}
