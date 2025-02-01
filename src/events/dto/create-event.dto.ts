import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EventStatus } from '../enum/event-status.enum';

export class CreateEventDto {
  @ApiProperty({
    example: 'Event 1',
  })
  @IsString()
  name: string;
  @ApiProperty({
    description: 'Event start date',
    example: '2024-12-14T10:00:00Z',
  })
  @IsNotEmpty({
    message: 'Event start date is required',
  })
  @IsISO8601({}, { message: 'Incorrect date format' })
  eventStartDate: string;
  @ApiProperty({
    description: 'Event end date',
    example: '2024-12-17T10:00:00Z',
  })
  @IsISO8601({}, { message: 'Incorrect date format' })
  eventEndDate?: string;
  @ApiProperty({
    description: 'Status of the event',
    example: 'upcoming',
  })
  @IsEnum(EventStatus)
  status: EventStatus;

  @IsString()
  @IsOptional()
  created_by_user_id?: string;
}
