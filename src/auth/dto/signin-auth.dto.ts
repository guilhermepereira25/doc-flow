import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignInAuthDto {
  @ApiProperty()
  @IsEmail()
  @Matches(/@cefet-rj\.br$/, {
    message: 'Only email from cefet-rj.br domain are allowed',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
