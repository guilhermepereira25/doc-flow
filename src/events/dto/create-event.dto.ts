import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    example: 'Event 1',
  })
  @IsString()
  name: string;
}
