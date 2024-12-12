import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePresenceDto {
  @ApiProperty()
  @IsNotEmpty()
  event_id: string;
}
