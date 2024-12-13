import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCertificateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  eventId: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fileId: string;
}
