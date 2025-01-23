import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @Matches(/@cefet-rj\.br$/, {
    message: 'Only email from cefet-rj.br domain are allowed',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  enrollment?: string;

  @ApiProperty()
  @IsString()
  profileId?: string;
}
