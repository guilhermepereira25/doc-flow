import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class SignUpAuthDto {
  @IsString()
  @ApiProperty()
  username: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  profileId?: string;
}
