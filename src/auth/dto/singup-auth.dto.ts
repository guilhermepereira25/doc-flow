import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class SignUpAuthDto {
  @ApiProperty()
  @IsEmail()
  @Matches(/@cefet-rj\.br$/, {
    message: 'Only email from cefet-rj.br domain are allowed',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @Matches(/\d{4}\d{3}[A-Z]{4}$/, {
    message: 'Enrollment must be in the format 99992020SINF',
  })
  @IsString()
  enrollment?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  profileId?: string;
}
